import { useGetConfirmation } from "shared/lib/confirmation"
import { useSetDialogValues, UseSetValuesClear } from "shared/hooks/use-set-dialog-values"
import { Text } from "shared/ui/text"
import { observer } from "mobx-react-lite"
import { LangContext, useLang } from "shared/context/lang"
import { FormProvider, useForm } from "react-hook-form"
import { CategoryDto } from "shared/types/category"
import { CATEGORY_DEFAULT_VALUES, TABS } from "features/categories/dialog/domain/const"
import { useCreateDialogStore } from "shared/context/dialog-create-context"
import { useCategoryStores } from "features/categories/dialog/ui/context"
import { useCreateCategory } from "features/categories/dialog/queries/use-create-category"
import { PasteSettings, useCopyPaste } from "features/categories/copy-paste-settings"
import { eventBus } from "shared/lib/event-bus"
import { updateCaption } from "features/categories/dialog/domain/event"
import { UpsertDialog } from "shared/ui/dialog/upsert-dialog"
import { ContentContainer } from "features/categories/dialog/ui/content-container"
import { DialogHeader, DialogHeaderCaption } from "shared/ui/dialog/dialog-header"
import { MenuPopup } from "shared/ui/menu-popup"
import { TabsContainer } from "shared/ui/tabs/tabs-container"
import { Box } from "shared/ui/box"
import { IconButton } from "shared/ui/buttons/icon-button"
import { useEventBusListen } from "shared/hooks/use-event-bus-listen"
import { openCreateCategoryDialog } from "widgets/category-dialog"
import { CategoryHistory, useUndoRedoCategory } from "features/categories/history"
import { useKeyboard } from "shared/lib/keyboard-manager"
import { Mark } from "shared/ui/mark"

export const useClearDialog = () => {
  const langBase = "catalog.confirm.clear"
  const getConfirmation = useGetConfirmation()

  return async (callback: UseSetValuesClear) => {
    const confirmation = await getConfirmation({
      langBase,
      description: <Text langBase={langBase} name="description" />,
      confirmText: "confirm",
    })

    if (confirmation) callback()
  }
}

export const CategoryCreateDialog = observer(() => {
  const langBase = useLang()

  const methods = useForm<CategoryDto.CategoryCreate>({ defaultValues: CATEGORY_DEFAULT_VALUES })
  const dialogStore = useCreateDialogStore()
  const categoryStore = useCategoryStores()
  const handleClear = useClearDialog()

  useEventBusListen(openCreateCategoryDialog, () => {
    dialogStore.openDialogV2()
  })

  const getConfirmation = useGetConfirmation()
  const { onCreate, isLoadingCreate, isSuccessCreate } = useCreateCategory()

  const { apply, clear } = useSetDialogValues({
    data: CATEGORY_DEFAULT_VALUES,
    defaults: CATEGORY_DEFAULT_VALUES,
    setData: [
      (data) => categoryStore.historyStore.setCategory({ ...data, ...categoryStore.getData() }),
    ],
    clearData: [categoryStore.destroy, methods.reset],
    shouldHandle: [dialogStore.open],
  })

  const { handleCopy, handlePaste } = useCopyPaste(apply, methods, {
    getData: categoryStore.getData,
    setCopiedData: categoryStore.setCopiedData,
    callback: (payload) => {
      eventBus.emit(updateCaption({ caption: payload.caption }))
    },
  })

  const { handleUndo, handleRedo, handleMoveToEvent } = useUndoRedoCategory(
    apply,
    methods,
    categoryStore.historyStore,
    categoryStore.setData,
  )

  useKeyboard({
    key: "Escape",
    disabled: !dialogStore.open,
    callback: async () => {
      const close = await getConfirmation({
        langBase: "catalog.dialog",
        description: "confirmText",
        confirmText: "yes",
      })

      if (close === false) return

      dialogStore.closeDialog()
    },
  })

  /* useKeyboard({
    key: "z",
    disabled: !categoryStore.historyStore.canUndo,
    callback: (event) => {
      if (event.ctrlKey) handleUndo()
    },
  })

  useKeyboard({
    key: "Z",
    disabled: !categoryStore.historyStore.canRedo,
    callback: (event) => {
      if (event.shiftKey) handleRedo()
    },
  }) */

  const handleSubmit = (payload: CategoryDto.CategoryFields) => {
    onCreate({
      ...payload,
      ...categoryStore.getData(),
    })
  }

  return (
    <FormProvider {...methods}>
      <UpsertDialog
        close={isSuccessCreate}
        store={dialogStore}
        handleSubmit={handleSubmit}
        isLoading={isLoadingCreate}
        container={<ContentContainer />}
        header={(
          <DialogHeader
            store={dialogStore}
            onCopyClick={handleCopy}
            onPasteClick={handlePaste}
            onClearClick={() => handleClear(clear)}
            showActions
            settings={(
              <MenuPopup>
                <LangContext lang={`${langBase}.settings`}>
                  <PasteSettings />
                </LangContext>
              </MenuPopup>
            )}
            title={(
              <DialogHeaderCaption
                name="title.create"
              />
            )}
          />
        )}
        tabs={(
          <LangContext lang={`${langBase}.tabs`}>
            <TabsContainer
              tabs={TABS}
              requiredFields={["caption"]}
            />
          </LangContext>
        )}
        footer={(
          <Box flex row gap ai>
            <CategoryHistory
              historyStore={categoryStore.historyStore}
              moveToVersion={handleMoveToEvent}
              onUndo={handleUndo}
              onRedo={handleRedo}
            />
            <IconButton
              name="undo"
              disabled={!categoryStore.historyStore.canUndo}
              onClick={handleUndo}
              help={{
                title: (
                  <Text
                    name="undo"
                    value="Ctrl+Z"
                    translateOptions={{
                      components: { strong: <Mark /> },
                    }}
                  />
                ),
              }}
            />
            <IconButton
              name="redo"
              disabled={!categoryStore.historyStore.canRedo}
              onClick={handleRedo}
              help={{
                title: (
                  <Text
                    name="redo"
                    value="Ctrl+Shift+Z"
                    translateOptions={{
                      components: { strong: <Mark /> },
                    }}
                  />
                ),
              }}
            />
          </Box>
        )}
        PaperProps={{
          sx: {
            ...(dialogStore.fullScreen
              ? { borderRadius: "0px !important" }
              : {}),
          },
        }}
      />
    </FormProvider>
  )
})

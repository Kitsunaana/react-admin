import { zodResolver } from "@hookform/resolvers/zod"
import { PasteSettings, useCopyPaste } from "features/categories/copy-paste-settings"
import { CATEGORY_DEFAULT_VALUES, TABS } from "features/categories/dialog/domain/const"
import { updateCaption } from "features/categories/dialog/domain/event"
import { useCreateCategory } from "features/categories/dialog/queries/use-create-category"
import { ContentContainer } from "features/categories/dialog/ui/content-container"
import { useCategoryStores } from "features/categories/dialog/ui/context"
import { CategoryHistory, useUndoRedoCategory } from "features/categories/history"
import { observer } from "mobx-react-lite"
import { FormProvider, useForm } from "react-hook-form"
import { useCreateDialogStore } from "shared/context/dialog-create-context"
import { LangContext, useLang } from "shared/context/lang"
import { useEventBusListen } from "shared/hooks/use-event-bus-listen"
import { useSetDialogValues, UseSetValuesClear } from "shared/hooks/use-set-dialog-values"
import { useGetConfirmation } from "shared/lib/confirmation"
import { eventBus } from "shared/lib/event-bus"
import { CategoryDto } from "shared/types/category"
import { Box } from "shared/ui/box"
import { IconButton } from "shared/ui/buttons/icon-button"
import { DialogHeader, DialogHeaderCaption } from "shared/ui/dialog/dialog-header"
import { UpsertDialog } from "shared/ui/dialog/upsert-dialog"
import { Mark } from "shared/ui/mark"
import { MenuPopup } from "shared/ui/menu-popup"
import { TabsContainer } from "shared/ui/tabs/tabs-container"
import { Text } from "shared/ui/text"
import { openCreateCategoryDialog } from "widgets/category-dialog"
import { z } from "zod"

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

const validationCategorySchema = z.object({
  caption: z.string().nonempty({ message: "required" }).min(3, { message: "minLength" }),
  bgColor: z.string(),
  blur: z.number().min(0).max(20),
  color: z.string(),
  description: z.string(),
  isShowPhotoWithGoods: z.boolean(),
})

export const CategoryCreateDialog = observer(() => {
  const langBase = useLang()

  const methods = useForm<CategoryDto.CategoryCreate>({
    defaultValues: CATEGORY_DEFAULT_VALUES,
    resolver: zodResolver(validationCategorySchema),
  })
  const dialogStore = useCreateDialogStore()
  const categoryStore = useCategoryStores()
  const handleClear = useClearDialog()

  useEventBusListen(openCreateCategoryDialog, () => {
    dialogStore.openDialogV2()
  })

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

  const handleSubmit = (payload: CategoryDto.CategoryFields) => {
    onCreate({
      ...payload,
      ...categoryStore.getData(),
    })
  }

  return (
    <FormProvider {...methods}>
      <UpsertDialog
        confirmSave
        confirmClose
        close={isSuccessCreate}
        store={dialogStore}
        handleSubmit={handleSubmit}
        isLoading={isLoadingCreate}
        container={<ContentContainer tab={dialogStore.tab} />}
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
              store={dialogStore}
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

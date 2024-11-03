import { zodResolver } from "@hookform/resolvers/zod"
import { PasteSettings, useCopyPaste } from "features/categories/copy-paste-settings"
import { CategoryHistory, useUndoRedoCategory } from "features/categories/history"
import { observer } from "mobx-react-lite"
import { FormProvider, useForm } from "react-hook-form"
import { useCreateDialogStore } from "shared/context/dialog-create-context"
import { LangContext, useLang } from "shared/context/lang"
import { useEventBusListen } from "shared/hooks/use-event-bus-listen"
import { useSetDialogValues } from "shared/hooks/use-set-dialog-values"
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
import { CATEGORY_DEFAULT_VALUES, TABS } from "../domain/const"
import { openCreateCategoryDialog, updateCaption } from "../domain/event"
import { validationCategorySchema } from "../domain/schemas"
import { useClearDialog } from "../model/use-clear-dialog"
import { useCreateCategory } from "../queries/use-create-category"
import { ContentContainer } from "./content-container"
import { useCategoryStores } from "./context"
import { useDialogKeyboardEvents } from "../model/use-dialog-keyboard-events"

export const CategoryCreateDialog = observer(() => {
  const langBase = useLang()
  const dialogStore = useCreateDialogStore()
  const categoryStore = useCategoryStores()
  const handleClear = useClearDialog()
  const methods = useForm<CategoryDto.CategoryCreate>({
    defaultValues: CATEGORY_DEFAULT_VALUES,
    resolver: zodResolver(validationCategorySchema),
  })

  useEventBusListen(openCreateCategoryDialog, () => {
    dialogStore.openDialogV2()
  })

  const { onCreate, isLoadingCreate, isSuccessCreate } = useCreateCategory()

  const { apply, clear } = useSetDialogValues({
    data: CATEGORY_DEFAULT_VALUES,
    defaults: CATEGORY_DEFAULT_VALUES,
    setData: [(data) => categoryStore.historyStore.setCategory({ ...data, ...categoryStore.getData() })],
    clearData: [categoryStore.destroy, methods.reset],
    shouldHandle: [dialogStore.open],
  })

  const { handleCopy, handlePaste } = useCopyPaste({
    apply,
    methods,
    getData: categoryStore.getData,
    setCopiedData: categoryStore.setCopiedData,
    callback: (payload) => eventBus.emit(updateCaption({ caption: payload.caption })),
  })

  const { handleUndo, handleRedo, handleMoveToEvent } = useUndoRedoCategory({
    apply,
    methods,
    historyStore: categoryStore.historyStore,
    setData: categoryStore.setData,
  })

  useDialogKeyboardEvents({
    open: dialogStore.open,
    canRedo: categoryStore.historyStore.canRedo,
    canUndo: categoryStore.historyStore.canUndo,
    onRedo: handleRedo,
    onUndo: handleUndo,
    onToggleFullscreen: dialogStore.onToggleSizeScreen,
  })

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
            title={<DialogHeaderCaption name="title.create" />}
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

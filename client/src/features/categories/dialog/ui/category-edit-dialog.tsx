import { zodResolver } from "@hookform/resolvers/zod"
import { useGetCategory } from "entities/category"
import { PasteSettings, useCopyPaste } from "features/categories/copy-paste-settings"
import { CategoryHistory, useUndoRedoCategory } from "features/categories/history"
import { observer } from "mobx-react-lite"
import { FormProvider, useForm } from "react-hook-form"
import { useEditDialogStore } from "shared/context/dialog-edit-context"
import { LangContext, useLang } from "shared/context/lang"
import { useEventBusListen } from "shared/hooks/use-event-bus-listen"
import { useSetDialogValues } from "shared/hooks/use-set-dialog-values"
import { eventBus } from "shared/lib/event-bus"
import { getNumberOrNull, include } from "shared/lib/utils"
import { CategoryDto } from "shared/types/category"
import { Box } from "shared/ui/box"
import { IconButton } from "shared/ui/buttons/icon-button"
import { DialogHeader, DialogHeaderCaption } from "shared/ui/dialog/dialog-header"
import { UpsertDialog } from "shared/ui/dialog/upsert-dialog"
import { Mark } from "shared/ui/mark"
import { MenuPopup } from "shared/ui/menu-popup"
import { TabsContainer } from "shared/ui/tabs/tabs-container"
import { Text } from "shared/ui/text"
import { CATEGORY_DEFAULT_VALUES, CATEGORY_FIELDS, TABS } from "../domain/const"
import { openEditCategoryDialog, updateCaption } from "../domain/event"
import { validationCategorySchema } from "../domain/schemas"
import { useDialogKeyboardEvents } from "../model/use-dialog-keyboard-events"
import { useOpenDialogFromUrl } from "../model/use-open-dialog-fron-url"
import { useEditCategory } from "../queries/use-edit-category"
import { ContentContainer } from "./content-container"
import { useCategoryStores } from "./context"

export const CategoryEditDialog = observer(() => {
  const langBase = useLang()

  const methods = useForm<CategoryDto.CategoryCreate>({
    defaultValues: CATEGORY_DEFAULT_VALUES,
    resolver: zodResolver(validationCategorySchema),
  })

  const dialogStore = useEditDialogStore()
  const categoryStore = useCategoryStores()
  const { handleClearParams } = useOpenDialogFromUrl()

  useEventBusListen(openEditCategoryDialog, ({ payload }) => {
    dialogStore.openDialog(payload.id)
  })

  const { category, isLoadingGet } = useGetCategory(getNumberOrNull(dialogStore.id))
  const { onEdit, isLoadingEdit, isSuccessEdit } = useEditCategory(getNumberOrNull(dialogStore.id))

  const { apply } = useSetDialogValues<
    CategoryDto.CategoryDto | undefined,
    CategoryDto.CategoryFields
  >({
    data: category,
    defaults: CATEGORY_DEFAULT_VALUES,
    setData: [
      (data) => categoryStore.setData({ ...data, images: [] }),
      (data) => categoryStore.historyStore.setCategory(data),
      (data) => methods.reset(include(data, CATEGORY_FIELDS)),
    ],
    clearData: [categoryStore.destroy, methods.reset],
    shouldHandle: [dialogStore.open],
  })

  const { handleUndo, handleRedo, handleMoveToEvent } = useUndoRedoCategory({
    apply,
    methods,
    historyStore: categoryStore.historyStore,
    setData: categoryStore.setData,
  })

  const { handleCopy, handlePaste } = useCopyPaste({
    apply,
    methods,
    getData: categoryStore.getData,
    setCopiedData: categoryStore.setCopiedData,
    callback: (payload) => eventBus.emit(updateCaption({ caption: payload.caption })),
  })

  useDialogKeyboardEvents({
    open: dialogStore.open,
    canRedo: categoryStore.historyStore.canRedo,
    canUndo: categoryStore.historyStore.canUndo,
    onRedo: handleRedo,
    onUndo: handleUndo,
    onToggleFullscreen: dialogStore.onToggleSizeScreen,
  })

  const handleSubmit = (fields: CategoryDto.CategoryFields) => {
    const rows = categoryStore.getData()

    onEdit({
      ...fields,
      ...rows,
      order: category!.order,
    })
  }

  return (
    <FormProvider {...methods}>
      <UpsertDialog
        confirmClose
        confirmSave
        onClose={handleClearParams}
        onSave={handleClearParams}
        close={isSuccessEdit}
        store={dialogStore}
        handleSubmit={handleSubmit}
        isLoading={(isLoadingGet || isLoadingEdit) && dialogStore.id !== null}
        container={<ContentContainer tab={dialogStore.tab} />}
        header={(
          <DialogHeader
            store={dialogStore}
            onCopyClick={handleCopy}
            onPasteClick={handlePaste}
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
                name="title.edit"
                value={category?.caption}
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

import { useGetCategory } from "entities/category"
import { useCopyPaste } from "features/categories/copy-paste-settings/hooks/use-copy"
import { PasteSettings } from "features/categories/copy-paste-settings/ui/paste-settings"
import { CATEGORY_DEFAULT_VALUES, CATEGORY_FIELDS, TABS } from "features/categories/dialog/domain/const"
import { useEditCategory } from "features/categories/dialog/queries/use-edit-category"
import { ContentContainer } from "features/categories/dialog/ui/content-container"
import { useCategoryStores } from "features/categories/dialog/ui/context"
import { useUndoRedoCategory } from "features/categories/history/hooks/use-undo-redo-category"
import { CategoryHistory } from "features/categories/history/ui/category-history"
import { observer } from "mobx-react-lite"
import { FormProvider, useForm } from "react-hook-form"
import { useEditDialogStore } from "shared/context/dialog-edit-context"
import { LangContext, useLang } from "shared/context/lang"
import { useSetDialogValues } from "shared/hooks/use-set-dialog-values"
import { getNumberOrNull, include } from "shared/lib/utils"
import { CategoryDto } from "shared/types/category"
import { Box } from "shared/ui/box"
import { IconButton } from "shared/ui/buttons/icon-button"
import { DialogHeader, DialogHeaderCaption } from "shared/ui/dialog/dialog-header"
import { UpsertDialog } from "shared/ui/dialog/upsert-dialog"
import { MenuPopup } from "shared/ui/menu-popup"
import { TabsContainer } from "shared/ui/tabs/tabs-container"

export const CategoryEditDialog = observer(() => {
  const langBase = useLang()

  const methods = useForm<CategoryDto.CategoryCreate>({ defaultValues: CATEGORY_DEFAULT_VALUES })
  const dialogStore = useEditDialogStore()
  const categoryStore = useCategoryStores()

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
    clearData: [categoryStore.destroy, methods.reset], // categoryStore.historyStore.reset
    shouldHandle: [dialogStore.open],
  })

  const { handleCopy, handlePaste } = useCopyPaste(apply, methods)
  const { handleUndo, handleRedo, handleMoveToEvent } = useUndoRedoCategory(apply, methods)

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
        close={isSuccessEdit}
        store={dialogStore}
        handleSubmit={handleSubmit}
        isLoading={(isLoadingGet || isLoadingEdit) && dialogStore.id !== null}
        container={<ContentContainer />}
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
              tabs={TABS}
              requiredFields={["caption"]}
            />
          </LangContext>
        )}
        footer={(
          <Box flex row gap ai>
            <CategoryHistory
              moveToVersion={handleMoveToEvent}
              onUndo={handleUndo}
              onRedo={handleRedo}
            />
            <IconButton
              name="undo"
              disabled={!categoryStore.historyStore.canUndo}
              onClick={handleUndo}
            />
            <IconButton
              name="redo"
              disabled={!categoryStore.historyStore.canRedo}
              onClick={handleRedo}
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

import { useGetCategory } from "entities/category"
import { useCopyPaste } from "features/categories/copy-paste-settings/hooks/use-copy-paste"
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
import { getNumberOrNull, include, isNumber } from "shared/lib/utils"
import { CategoryDto } from "shared/types/category"
import { Box } from "shared/ui/box"
import { IconButton } from "shared/ui/buttons/icon-button"
import { DialogHeader, DialogHeaderCaption } from "shared/ui/dialog/dialog-header"
import { UpsertDialog } from "shared/ui/dialog/upsert-dialog"
import { MenuPopup } from "shared/ui/menu-popup"
import { TabsContainer } from "shared/ui/tabs/tabs-container"
import { useEventBusListen } from "shared/hooks/use-event-bus-listen"
import { openEditCategoryDialog } from "widgets/category-dialog"
import { Text } from "shared/ui/text"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useKeyboard } from "shared/lib/keyboard-manager"
import { useGetConfirmation } from "shared/lib/confirmation"
import { Mark } from "shared/ui/mark"

export const useOpenDialogFromUrl = () => {
  const dialogStore = useEditDialogStore()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const readId = searchParams.get("edit")
    if (readId === null) return

    const transformId = parseInt(readId, 10)

    if (isNumber(transformId)) dialogStore.openDialog(transformId)
  }, [])

  const handleClearParams = () => {
    searchParams.delete("edit")

    setSearchParams((prev) => {
      prev.delete("edit")
      return prev
    })
  }

  return {
    handleClearParams,
  }
}

export const CategoryEditDialog = observer(() => {
  const langBase = useLang()

  const methods = useForm<CategoryDto.CategoryCreate>({ defaultValues: CATEGORY_DEFAULT_VALUES })
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

  const { handleUndo, handleRedo, handleMoveToEvent } = useUndoRedoCategory(
    apply,
    methods,
    categoryStore.historyStore,
    categoryStore.setData,
  )
  const { handleCopy, handlePaste } = useCopyPaste(apply, methods, {
    getData: categoryStore.getData,
    setCopiedData: categoryStore.setCopiedData,
  })

  useKeyboard({
    key: "z",
    disabled: !categoryStore.historyStore.canUndo && !dialogStore.open,
    callback: ({ ctrlKey }) => {
      if (ctrlKey) handleUndo()
    },
  })

  useKeyboard({
    key: "f",
    callback: ({ ctrlKey, altKey }) => {
      if (ctrlKey && altKey) dialogStore.onToggleSizeScreen()
    },
  })

  useKeyboard({
    key: "ArrowRight",
    callback: (event) => {
      if (event.ctrlKey) {
        dialogStore.changeTab(Math.min(dialogStore.tab + 1, 5))
      }
    },
  })

  useKeyboard({
    key: "ArrowLeft",
    callback: (event) => {
      if (event.ctrlKey) {
        dialogStore.changeTab(Math.max(0, dialogStore.tab - 1))
      }
    },
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

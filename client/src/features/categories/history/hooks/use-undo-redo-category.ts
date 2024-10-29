import { UseSetValuesApply } from "shared/hooks/use-set-dialog-values"
import { UseFormReturn } from "react-hook-form"
import { useCategoryStores } from "features/categories/@dialog/ui/context"
import { useEditDialogStore } from "shared/context/dialog-edit-context"
import { CategoryDto } from "shared/types/category"

export const useUndoRedoCategory = (
  apply: UseSetValuesApply,
  methods: UseFormReturn<CategoryDto.CategoryCreate>,
) => {
  const categoryStore = useCategoryStores()
  const dialogStore = useEditDialogStore()

  const changeTab = () => {
    if (categoryStore.historyStore.currentVersion) {
      const { tab } = categoryStore.historyStore.currentVersion
      dialogStore.changeTab(tab)
    }
  }

  const applyCategory = () => {
    apply({
      data: categoryStore.category,
      setData: [methods.reset, categoryStore.setData],
    })
  }

  const handleMoveToEvent = (index: number) => {
    categoryStore.historyStore.moveToVersion(index)
    changeTab()
    applyCategory()
  }

  const handleUndo = () => {
    categoryStore.historyStore.undo()
    changeTab()
    applyCategory()
  }

  const handleRedo = () => {
    categoryStore.historyStore.redo()
    changeTab()
    applyCategory()
  }

  return {
    handleMoveToEvent,
    handleUndo,
    handleRedo,
  }
}

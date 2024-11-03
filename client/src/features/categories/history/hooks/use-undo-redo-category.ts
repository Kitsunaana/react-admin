import { UseSetValuesApply } from "shared/hooks/use-set-dialog-values"
import { UseFormReturn } from "react-hook-form"
import { useEditDialogStore } from "shared/context/dialog-edit-context"
import { CategoryDto } from "shared/types/category"
import { Category } from "../domain/types"
import { HistoryStoreImpl } from "../domain/interface-history.store"

interface UseUndoRedoCategoryOptions {
  apply: UseSetValuesApply
  methods: UseFormReturn<CategoryDto.CategoryCreate>
  historyStore: HistoryStoreImpl
  setData: (payload: Category) => void
}

export const useUndoRedoCategory = (options: UseUndoRedoCategoryOptions) => {
  const {
    apply, methods, setData, historyStore,
  } = options

  const dialogStore = useEditDialogStore()

  const changeTab = () => {
    if (historyStore.currentVersion) {
      const { tab } = historyStore.currentVersion
      dialogStore.changeTab(tab)
    }
  }

  const applyCategory = () => {
    apply({
      data: historyStore.category,
      setData: [methods.reset, setData],
    })
  }

  const handleMoveToEvent = (index: number) => {
    historyStore.moveToVersion(index)
    changeTab()
    applyCategory()
  }

  const handleUndo = () => {
    historyStore.undo()
    changeTab()
    applyCategory()
  }

  const handleRedo = () => {
    historyStore.redo()
    changeTab()
    applyCategory()
  }

  return {
    handleMoveToEvent,
    handleUndo,
    handleRedo,
  }
}

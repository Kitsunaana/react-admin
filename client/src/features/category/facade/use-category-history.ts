import { useModalStore } from "shared/hooks/use-modal-store"
import { useHistoryStore } from "../view-model/history/use-history-store"
import { getCategoryDefault } from "../view-model/const"
import { useCategoryFormContext } from "../view-model/form/use-category-form"

export const useCategoryHistory = () => {
  const changeTab = useModalStore((store) => store.changeTab)

  const categoryForm = useCategoryFormContext()
  const history = useHistoryStore()

  const applyEvent = (callback: () => void) => {
    callback()

    if (history.currentVersion && history.currentVersion.tab !== undefined) {
      changeTab(history.currentVersion.tab)
    }

    const categoryDefault = getCategoryDefault()
    const calcCategory = history.getCategory(categoryDefault)

    categoryForm.set(calcCategory)
  }

  const onMoveToEvent = (index: number) => applyEvent(() => history.moveToVersion(index))

  const onUndo = () => history.canUndo && applyEvent(history.undo)
  const onRedo = () => history.canRedo && applyEvent(history.redo)

  return {
    onUndo,
    onRedo,
    onMoveToEvent,
    canRedo: history.canRedo,
    canUndo: history.canUndo,
    cursor: history.cursor,
    noOneEvent: history.noOneEvent,
    events: history.getCategoryWithEvents(getCategoryDefault()),
    clear: history.reset,
  }
}

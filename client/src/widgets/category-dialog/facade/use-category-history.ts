import { useKeyboard } from "shared/lib/keyboard-manager"
import { ctrlKey, shiftCtrlKey } from "shared/lib/keyboard-manager/handlers"
import { useModalStore } from "shared/hooks/use-modal-store"
import { useHistoryStore } from "../model/history/use-history-store"
import { getCategoryDefault } from "../domain/const"
import { useCategoryFormContext } from "../view-model/form/use-category-form"

export const useCategoryHistory = () => {
  const changeTab = useModalStore((store) => store.changeTab)
  const categoryForm = useCategoryFormContext()
  const history = useHistoryStore()

  const applyEvent = (callback: () => void) => {
    callback()
    if (history.currentVersion) changeTab(history.currentVersion.tab)

    categoryForm.set(
      history.getCategory(getCategoryDefault()),
    )
  }

  const onMoveToEvent = (index: number) => applyEvent(() => history.moveToVersion(index))

  const onUndo = () => applyEvent(history.undo)
  const onRedo = () => applyEvent(history.redo)

  useKeyboard({
    key: "z",
    callback: ctrlKey(onUndo),
  })

  useKeyboard({
    key: "Z",
    callback: shiftCtrlKey(onRedo),
  })

  return {
    onUndo,
    onRedo,
    onMoveToEvent,
    canRedo: history.canRedo,
    canUndo: history.canUndo,
    cursor: history._cursor,
    noOneEvent: history._events.length === 0,
    events: history.getCategoryWithEvents(getCategoryDefault()),
    clear: history.reset,
  }
}

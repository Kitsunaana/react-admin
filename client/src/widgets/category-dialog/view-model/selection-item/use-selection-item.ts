import { useState } from "react"
import { altCtrlKey, useKeyboard } from "shared/lib/keyboard-manager"
import { createSelectionItem } from "./selection-item-store"

export const useSelectionItem = (count: number) => {
  const [selectionItem] = useState(createSelectionItem)

  useKeyboard({
    key: "ArrowDown",
    callback: () => selectionItem.nextItem(count),
  })

  useKeyboard({
    key: "ArrowUp",
    callback: () => selectionItem.prevItem(count),
  })

  useKeyboard({
    key: "q",
    callback: altCtrlKey(selectionItem.unselect),
  })

  return selectionItem
}

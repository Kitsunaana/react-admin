import { MutableRefObject, useRef, useState } from "react"
import { useCreateDialogStore } from "shared/context/dialog-create-context"
import { useEditDialogStore } from "shared/context/dialog-edit-context"
import { useKeyboard } from "shared/lib/keyboard-manager"

interface UseKeyboardEventInfo {
  tab: number
  itemsCount: number
  getNodes?: (ref: MutableRefObject<HTMLDivElement | null>) => HTMLCollection
}

interface UseKeyboardEvents {
  onOpenCreateDialog?: (event: KeyboardEvent) => void
  onOpenEditDialog?: (index: number, event: KeyboardEvent) => void
  onTakeOffSelect?: (event: KeyboardEvent) => void
  onNextItemSelect?: (findNode: Element, event: KeyboardEvent) => void
  onPrevItemSelect?: (findNode: Element, event: KeyboardEvent) => void
  onRemoveItem?: (index: number, event: KeyboardEvent) => void
}

type SelectedRef = { index: null | number, show: boolean }

export const useKeyboardEvents = (info: UseKeyboardEventInfo, events?: UseKeyboardEvents) => {
  const { itemsCount, tab, getNodes } = info

  const createDialogStore = useCreateDialogStore()
  const editDialogStore = useEditDialogStore()

  const refBox = useRef<HTMLDivElement | null>(null)

  const [selected, setSelected] = useState<SelectedRef>({ index: null, show: false })

  const disabledDialog = createDialogStore.tab !== tab && editDialogStore.tab !== tab

  const handleOpenCreateDialog = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.altKey) {
      events?.onOpenCreateDialog?.(event)
    }
  }

  const handleTakeOffSelect = (event: KeyboardEvent) => {
    if (event.altKey && event.ctrlKey) {
      setSelected((prevState) => ({ ...prevState, show: false }))

      if (events?.onTakeOffSelect) events.onTakeOffSelect(event)
    }
  }

  const handleOpenEditDialog = (event: KeyboardEvent) => {
    if (selected.index !== null && event.ctrlKey && event.altKey) {
      events?.onOpenEditDialog?.(selected.index, event)
    }
  }

  const scrollToElement = (newIndex: number, event: KeyboardEvent) => {
    const itemNodes = Array.from(getNodes!(refBox))
    const findNode = itemNodes.find((_, index) => index === newIndex)

    if (findNode instanceof Element) {
      findNode.scrollIntoView({ behavior: "smooth" })

      if (events?.onNextItemSelect) events.onNextItemSelect(findNode, event)
    }

    return {
      index: newIndex,
      show: true,
    }
  }

  const handleNextItemSelect = (event: KeyboardEvent) => {
    if (event.ctrlKey) {
      setSelected((prevState) => {
        if (!getNodes) return prevState

        let newIndex = prevState.index

        if (newIndex === null) newIndex = 0
        else newIndex = (newIndex + 1) > itemsCount ? 0 : (newIndex + 1)

        return scrollToElement(newIndex, event)
      })
    }
  }

  const handlePrevItemSelect = (event: KeyboardEvent) => {
    if (event.ctrlKey) {
      setSelected((prevState) => {
        if (!getNodes) return prevState

        let newIndex = prevState.index

        if (newIndex === null) newIndex = 0
        else newIndex = (newIndex - 1) >= 0 ? (newIndex - 1) : itemsCount

        return scrollToElement(newIndex, event)
      })
    }
  }

  const handleOpenRemoveConfirm = async (event: KeyboardEvent) => {
    if (selected.index !== null && event.ctrlKey && event.altKey) {
      if (events?.onRemoveItem) events.onRemoveItem(selected.index, event)
    }
  }

  useKeyboard({
    key: "a",
    disabled: disabledDialog,
    callback: handleOpenCreateDialog,
  })

  useKeyboard({
    key: "q",
    disabled: selected.index === null,
    callback: handleTakeOffSelect,
  })

  useKeyboard({
    key: "e",
    disabled: selected.index === null,
    callback: handleOpenEditDialog,
  })

  useKeyboard({
    key: "d",
    disabled: selected.index === null,
    callback: handleOpenRemoveConfirm,
  })

  useKeyboard({
    key: "ArrowDown",
    callback: handleNextItemSelect,
  })

  useKeyboard({
    key: "ArrowUp",
    callback: handlePrevItemSelect,
  })

  return {
    ...selected,
    refBox,
  }
}

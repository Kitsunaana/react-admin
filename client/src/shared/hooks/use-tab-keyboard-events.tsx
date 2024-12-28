import { useRef, useState } from "react"
import { useKeyboard } from "shared/lib/keyboard-manager"

type SelectedRef = { index: null | number, show: boolean }

interface useListKeyboardEventsProps {
  onTakeOffSelect?: (event: KeyboardEvent) => void
  onNextItemSelect?: (findNode: Element, event: KeyboardEvent) => void
  onPrevItemSelect?: (findNode: Element, event: KeyboardEvent) => void
}

export const useListKeyboardEvents = (events?: useListKeyboardEventsProps) => {
  const refBox = useRef<HTMLDivElement | null>(null)
  const [selected, setSelected] = useState<SelectedRef>({ index: null, show: false })

  const getNodes = () => refBox?.current?.children as HTMLCollection

  const itemsCount = getNodes()?.length ?? 0

  const scrollToElement = (newIndex: number, event: KeyboardEvent) => {
    const itemNodes = Array.from(getNodes())
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

  useKeyboard({
    key: "q",
    disabled: selected.index === null,
    callback: (event) => {
      if (event.altKey && event.ctrlKey) {
        setSelected({ show: false, index: null })

        if (events?.onTakeOffSelect) events.onTakeOffSelect(event)
      }
    },
  })

  useKeyboard({
    key: "ArrowDown",
    callback: (event) => {
      if (event.ctrlKey) {
        const nodeHeight = (getNodes()[0]?.clientHeight ?? 0)
        const scrollHeight = refBox?.current?.scrollTop ?? 0

        setSelected((prevState) => {
          if (!getNodes) return prevState

          let newIndex = prevState.index

          const index = Math.floor(scrollHeight / nodeHeight)
          if (newIndex === null) newIndex = Math.max(index - 1, 0)
          else newIndex = (newIndex + 1) > itemsCount - 1 ? 0 : (newIndex + 1)

          return scrollToElement(newIndex, event)
        })
      }
    },
  })

  useKeyboard({
    key: "ArrowUp",
    callback: (event) => {
      if (event.ctrlKey) {
        const nodeHeight = (getNodes()[0]?.clientHeight ?? 0) + 2
        const scrollHeight = refBox?.current?.scrollTop ?? 0

        setSelected((prevState) => {
          if (!getNodes) return prevState

          let newIndex = prevState.index

          const index = Math.floor(scrollHeight / nodeHeight)
          if (newIndex === null) newIndex = Math.min(index + 1, itemsCount)
          else newIndex = (newIndex - 1) >= 0 ? (newIndex - 1) : itemsCount - 1

          return scrollToElement(newIndex, event)
        })
      }
    },
  })

  const isShowSelection = (index: number) => selected.index === index && selected.show

  return {
    ...selected,
    refBox,
    isShowSelection,
  }
}

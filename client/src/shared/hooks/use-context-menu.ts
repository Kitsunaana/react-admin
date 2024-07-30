import { MouseEvent, useRef, useState } from "react"
import { useContextMenuPosition } from "shared/hooks/use-context-menu-position"
import { useClickAway } from "shared/hooks/use-click-away"
import { useEvent } from "shared/hooks/use-event"

export const useContextMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const move = useContextMenuPosition(ref, isOpen)

  const open = (event: MouseEvent) => {
    event.preventDefault()

    move(event.clientX, event.clientY)

    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
  }

  const handleEsc = ({ key }) => {
    if (key === "Escape") close()
  }

  useClickAway(ref, close, isOpen)

  useEvent("keydown", handleEsc, isOpen)

  return {
    ref,
    open,
    close,
    isOpen,
  }
}

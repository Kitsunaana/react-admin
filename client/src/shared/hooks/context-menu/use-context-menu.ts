import { MouseEvent, useRef, useState } from "react"
import { useContextMenuPosition } from "shared/hooks/context-menu/use-context-menu-position"
import { useClickAway } from "shared/hooks/context-menu/use-click-away"
import { useEvent } from "shared/hooks/context-menu/use-event"

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

  useClickAway(ref, close, isOpen)

  useEvent("keydown", (event) => {
    if (event.key === "Escape") close()
  }, isOpen)

  return {
    ref,
    open,
    close,
    isOpen,
  }
}

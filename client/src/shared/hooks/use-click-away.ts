import { useEvent } from "shared/hooks/use-event"

export const useClickAway = (ref: any, handler: any, shouldHandle: any = true) => {
  const handleMousedown = (event) => {
    const handle = shouldHandle instanceof Function ? shouldHandle(event) : shouldHandle

    if (handle && !ref.current.contains(event.target)) handler()
  }

  useEvent("mousedown", handleMousedown)
}

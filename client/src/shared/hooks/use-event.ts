import { useEffect } from "react"

export const useEvent = (name: string, handler: any, shouldHandle: any = true, target = document) => {
  useEffect(() => {
    const handle = shouldHandle instanceof Function ? shouldHandle() : shouldHandle

    if (!handle) return

    const node = target instanceof Function ? target() : target

    node.addEventListener(name, handler)

    return () => node.removeEventListener(name, handler)
  })
}

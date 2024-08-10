import { MutableRefObject } from "react"

type RefT = MutableRefObject<HTMLDivElement | null>

export const getPhotoByRef = (ref: RefT, index: number): HTMLElement | null => (
  ref.current!.querySelector(`img:nth-of-type(${index + 1})`)
)

export const actionsPhoto = (action: "hide" | "show", element: HTMLElement | null) => {
  if (!element) return

  element.dataset.active = action === "hide" ? "false" : "true"

  const datasetAction = action === "hide" ? "false" : "prepared"
  if (element.previousSibling) {
    (element.previousSibling as HTMLElement).dataset.active = datasetAction
  }

  if (element.nextSibling) {
    (element.nextSibling as HTMLElement).dataset.active = datasetAction
  }
}

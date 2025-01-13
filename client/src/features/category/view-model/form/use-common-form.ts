import { useModalStore } from "shared/hooks/use-modal-store"
import React from "react"
import { nanoid } from "nanoid"
import { useCategoryFormContext } from "./use-category-form"
import { useHistoryStore } from "../history/use-history-store"

export const useCommonForm = () => {
  const modal = useModalStore()
  const history = useHistoryStore()

  const form = useCategoryFormContext()

  const caption = form.getValues("caption")
  const description = form.getValues("description")

  const handleCaptionBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value === caption) return

    history.recordEvent({
      id: nanoid(),
      tab: modal.tab,
      type: "changeCaption",
      value: event.target.value,
    })
  }

  const handleCaptionClear = () => {
    history.recordEvent({
      id: nanoid(),
      tab: modal.tab,
      type: "changeCaption",
      value: "",
    })
  }

  const handleDescriptionBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value === description) return

    history.recordEvent({
      id: nanoid(),
      tab: modal.tab,
      type: "changeDescription",
      value: event.target.value,
    })
  }

  const handleDescriptionClear = () => {
    history.recordEvent({
      id: nanoid(),
      tab: modal.tab,
      type: "changeDescription",
      value: "",
    })
  }

  return {
    handleCaptionBlur,
    handleCaptionClear,
    handleDescriptionBlur,
    handleDescriptionClear,
  }
}

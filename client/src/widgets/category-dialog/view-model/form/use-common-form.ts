import { useModalStore } from "shared/hooks/use-modal-store"
import { useFormContext } from "react-hook-form"
import { CategoryFields } from "shared/types/new_types/types"
import React from "react"
import { nanoid } from "nanoid"
import { useHistoryStore } from "../../model/history/use-history-store"

export const useCommonForm = () => {
  const modal = useModalStore()
  const history = useHistoryStore()

  const form = useFormContext<CategoryFields>()

  const caption = form.getValues("caption")
  const description = form.getValues("description")

  const handleCaptionBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value === caption) return
    console.log("caption blur")

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

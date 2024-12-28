import { useModalStore } from "shared/hooks/use-modal-store"
import { ChangeEvent, FocusEvent } from "react"
import { ControllerRenderProps } from "react-hook-form"
import { nanoid } from "nanoid"
import { CategoryFields } from "shared/types/new_types/types"
import { useHistoryStore } from "../../model/history/use-history-store"

export const usePhotoPositionForm = () => {
  const tab = useModalStore((store) => store.tab)
  const history = useHistoryStore()

  const handleIsShowWithGoodsChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<CategoryFields, "isShowPhotoWithGoods">,
  ) => {
    const checked = event.target.value === "true"

    field.onChange(event)
    history.recordEvent({
      tab,
      id: nanoid(),
      type: "changeIsShowPhotoWithGoods",
      value: checked,
    })
  }

  const handleBgColorBlur = (event: FocusEvent<HTMLInputElement>) => {
    history.recordEvent({
      tab,
      id: nanoid(),
      type: "changeBgColor",
      value: event.target.value,
    })
  }

  const handleColorBlur = (event: FocusEvent<HTMLInputElement>) => {
    history.recordEvent({
      tab,
      id: nanoid(),
      type: "changeColor",
      value: event.target.value,
    })
  }

  const handleBlurEffectChange = (
    event: Event,
    field: ControllerRenderProps<CategoryFields, "blur">,
  ) => {
    if ("value" in event.target!) field.onChange(event.target.value)
  }

  const handleBlurEffectBlur = (event: FocusEvent<HTMLSpanElement>) => {
    const readAttribute = parseInt(event.target.getAttribute("value") ?? "0", 10)

    const blur = Number.isNaN(readAttribute) ? 0 : readAttribute

    history.recordEvent({
      tab,
      id: nanoid(),
      type: "changeBlur",
      value: blur,
    })
  }

  return {
    handleIsShowWithGoodsChange,
    handleBgColorBlur,
    handleColorBlur,
    handleBlurEffectChange,
    handleBlurEffectBlur,
  }
}

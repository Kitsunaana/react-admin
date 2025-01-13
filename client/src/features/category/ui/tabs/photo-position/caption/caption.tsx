import { useWatch } from "react-hook-form"
import { useCategoryFormContext } from "../../../../view-model/form/use-category-form"
import { CaptionView } from "./styles"

export const Caption = () => {
  const categoryForm = useCategoryFormContext()
  const [color, bgColor, blur, caption] = useWatch({
    control: categoryForm.control,
    name: ["color", "bgColor", "blur", "caption"],
  })

  return (
    <CaptionView
      caption={caption || "Untitled"}
      color={color}
      bgColor={bgColor}
      blur={blur}
    />
  )
}

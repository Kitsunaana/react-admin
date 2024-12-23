import { useWatch } from "react-hook-form"
import { CaptionView } from "./styles"

export const Caption = () => {
  const [color, bgColor, blur, caption] = useWatch({
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

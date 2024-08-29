import { observer } from "mobx-react-lite"
import { Text } from "shared/ui/text"
import { useStores } from "../../../model/context"

export const CustomizeCaption = observer(() => {
  const { photoPosition } = useStores()

  return (
    <Text
      caption="caption"
      sx={{
        fontSize: 20,
        lineHeight: 1.5,
        color: photoPosition.color,
        whiteSpace: "pre-line",
        padding: "4px 8px",
        background: photoPosition.bgColor,
        borderRadius: "8px",
        boxShadow: "rgba(255, 255, 255, 0.25) 0px 4px 30px",
        backdropFilter: `blur(${photoPosition.blur}px)`,
        border: "1px solid rgba(255, 255, 255, 0.12)",
      }}
    />
  )
})

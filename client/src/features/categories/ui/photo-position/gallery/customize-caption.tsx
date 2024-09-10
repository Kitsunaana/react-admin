import { Text } from "shared/ui/text"
import { useFormContext } from "react-hook-form"
import { useState } from "react"
import { eventBus } from "shared/lib/event-bus"
import { updateCaption } from "features/categories/ui/tabs/tab-common"

export const CustomizeCaption = () => {
  const { getValues } = useFormContext()
  const [caption, setCaption] = useState(() => ({
    caption: getValues("caption"),
    bgColor: getValues("bgColor"),
    color: getValues("color"),
    blur: getValues("blur"),
  }))

  eventBus.on(updateCaption, ({ payload }) => {
    console.log(payload)
    setCaption((prevState) => (
      Object.entries(prevState).reduce((prev, [key, value]) => {
        prev[key] = payload[key] ?? value

        return prev
      }, {} as typeof caption)
    ))
  })

  return (
    <Text
      caption={caption.caption}
      sx={{
        textAlign: "center",
        fontSize: 20,
        lineHeight: 1.5,
        color: caption.color,
        whiteSpace: "pre-line",
        padding: "4px 8px",
        background: caption.bgColor,
        borderRadius: "8px",
        boxShadow: "rgba(255, 255, 255, 0.25) 0px 4px 30px",
        backdropFilter: `blur(${caption.blur}px)`,
        border: "1px solid rgba(255, 255, 255, 0.12)",
      }}
    />
  )
}

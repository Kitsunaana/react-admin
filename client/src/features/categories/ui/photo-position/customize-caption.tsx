import { Text } from "shared/ui/text"
import { FieldValues, useFormContext, UseFormGetValues } from "react-hook-form"
import { useEffect, useState } from "react"
import { eventBus } from "shared/lib/event-bus"
import { updateCaption } from "features/categories/ui/tabs/tab-common"

type FieldsRecord = {
  caption: string
  bgColor: string
  color: string
  blur: number
}

const fields: Array<keyof FieldsRecord> = ["caption", "bgColor", "color", "blur"]

const getFnSetValues = <Key extends keyof FieldsRecord, >(fields: Array<Key>) => (
  (getValues: UseFormGetValues<FieldValues>) => (
    fields.reduce((prev, current) => {
      prev[current] = getValues(current)

      return prev
    }, {} as FieldsRecord)
  )
)

const setCaptionValues = getFnSetValues(fields)

export const CustomizeCaption = () => {
  const { getValues } = useFormContext()
  const [caption, setCaption] = useState(() => setCaptionValues(getValues))

  eventBus.on(updateCaption, ({ payload }) => {
    setCaption((prevState) => (
      Object.entries(prevState).reduce((prev, [key, value]) => {
        prev[key] = payload[key] ?? value

        return prev
      }, {} as typeof caption)
    ))
  })

  useEffect(
    () => { setCaption(setCaptionValues(getValues)) },
    [getValues("caption")],
  )

  if (!caption.caption) return null

  return (
    <Text
      caption={caption.caption}
      sx={{
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 3,
        overflow: "hidden",
        textOverflow: "ellipsis",
        textAlign: "center",
        fontSize: 20,
        lineHeight: 1.5,
        color: caption.color,
        whiteSpace: "pre-line",
        padding: "4px 8px",
        background: caption.bgColor,
        borderRadius: "8px",
        boxShadow: `${caption.bgColor} 0px 4px 30px`,
        backdropFilter: `blur(${caption.blur}px)`,
        border: "1px solid rgba(255, 255, 255, 0.12)",
      }}
    />
  )
}
import { Text } from "shared/ui/text"
import { Mark } from "shared/ui/mark"
import React from "react"
import { ICharacteristic } from "../model/types"

interface CaptionProps extends Partial<ICharacteristic> {}

export const Caption = (props: CaptionProps) => {
  const { caption, value, unit } = props

  return (
    <Text
      caption={(
        <>
          {caption}
          {": "}
          <Mark>{value}</Mark>
          {" "}
          {unit}
        </>
      )}
    />
  )
}

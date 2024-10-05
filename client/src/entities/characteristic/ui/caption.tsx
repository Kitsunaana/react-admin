import { Text } from "shared/ui/text"
import { Mark } from "shared/ui/mark"
import { Common } from "shared/types/common"

interface CaptionProps extends Partial<Common.CharacteristicBase> {}

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

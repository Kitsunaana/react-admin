import { Common } from "shared/types/common"
import { Mark } from "shared/ui/mark"
import { Text } from "shared/ui/text"

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

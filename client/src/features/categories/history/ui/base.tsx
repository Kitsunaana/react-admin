import { FC, PropsWithChildren } from "react"
import { Box } from "shared/ui/box"
import { Icon } from "shared/ui/icon"
import { Mark, MarkProps } from "shared/ui/mark"
import { RowItem } from "shared/ui/row-item"
import { Text } from "shared/ui/text"

interface MarkEventProps extends MarkProps {}

export const MarkEvent = (props: MarkEventProps) => (
  <Mark
    style={{
      fontSize: 12,
      maxWidth: 200,
      textWrap: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }}
    {...props}
  />
)

export interface TemplateEventProps {
  selected: boolean
  onClick: () => void
}

export const TemplateEvent: FC<PropsWithChildren<TemplateEventProps>> = (props) => {
  const { selected, onClick, children } = props

  return (
    <RowItem
      sx={{
        cursor: "pointer", py: 0.25, minHeight: 30,
      }}
      bgColor={selected && "warning"}
      onClick={onClick}
    >
      {children}
    </RowItem>
  )
}

interface PrevCurrentValuePropertyProps {
  selected: boolean
  onClick: () => void
  caption: string
  prevValue?: string | null
  currentValue?: string | null
  prevValueColor?: MarkProps["color"]
  currentValueColor?: MarkProps["color"]
}

export const PrevCurrentValueProperty = (props: PrevCurrentValuePropertyProps) => {
  const {
    selected,
    onClick,
    currentValue,
    prevValue,
    caption,
    prevValueColor,
    currentValueColor,
  } = props

  return (
    <RowItem
      sx={{ cursor: "pointer", py: 0.25, minHeight: 30 }}
      bgColor={selected && "warning"}
      onClick={onClick}
    >
      <Box flex ai row gap>
        <Text caption={caption} sx={{ fontSize: 12 }} />
        <Box flex ai row>
          {prevValue && (
            <MarkEvent color={prevValueColor ?? "warning"}>{prevValue}</MarkEvent>
          )}
          {prevValue && <Icon name="arrowRight" />}
          {currentValue && (
            <MarkEvent color={currentValueColor}>{currentValue}</MarkEvent>
          )}
        </Box>
      </Box>
    </RowItem>
  )
}

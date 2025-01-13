import { ReactNode } from "react"
import { Icon } from "shared/ui/icon"
import { MarkProps } from "shared/ui/mark"
import {
  MarkEventWrapper,
  StyledMark,
  StyledTemplateEvent,
  TemplateEventContainer,
  TemplateEventText,
  TemplateDifferedEventContainer,
} from "./styles"

export const MarkEvent = ({
  color,
  showLine,
  ...other
}: MarkProps & {
  showLine?: boolean
}) => (
  <MarkEventWrapper color={color as string} showLine={showLine}>
    <StyledMark color={color} {...other} />
  </MarkEventWrapper>
)

export type TemplateEventProps = {
  selected: boolean
  onClick: () => void
}

export const TemplateEvent = (props: TemplateEventProps & { children: ReactNode }) => {
  const { selected, onClick, children } = props

  return (
    <StyledTemplateEvent
      bgColor={selected && "warning"}
      onClick={onClick}
    >
      {children}
    </StyledTemplateEvent>
  )
}

export const PrevCurrentValueProperty = ({
  selected,
  onClick,
  currentValue,
  prevValue,
  caption,
  prevValueColor,
  currentValueColor,
  showLine,
}: {
  selected: boolean
  onClick: () => void
  caption: string
  prevValue?: string | null
  currentValue?: string | null
  prevValueColor?: MarkProps["color"]
  currentValueColor?: MarkProps["color"]
  showLine: boolean
}) => (
  <StyledTemplateEvent
    bgColor={selected && "warning"}
    onClick={onClick}
  >
    <TemplateEventContainer>
      <TemplateEventText caption={caption} />
      <TemplateDifferedEventContainer>
        {prevValue && <MarkEvent color={prevValueColor ?? "warning"}>{prevValue}</MarkEvent>}
        {prevValue && <Icon name="arrowRight" />}
        {currentValue && (
        <MarkEvent showLine={showLine} color={currentValueColor!}>
          {currentValue}
        </MarkEvent>
        )}
      </TemplateDifferedEventContainer>
    </TemplateEventContainer>
  </StyledTemplateEvent>
)

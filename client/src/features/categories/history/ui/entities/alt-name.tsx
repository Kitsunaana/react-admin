import { Common } from "shared/types/common"
import { Box } from "shared/ui/box"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import { AddAltNameEvent, RemoveAltNameEvent, UpdateAltNameEvent } from "../../domain/events"
import { Category } from "../../domain/types"
import { MarkEvent, TemplateEvent, TemplateEventProps } from "../base"

interface AltNameAddEventProps extends TemplateEventProps {
  event: AddAltNameEvent
}

export const AltNameAddEvent = (props: AltNameAddEventProps) => {
  const { event, ...other } = props

  return (
    <TemplateEvent {...other}>
      <Box flex row gap ai fontSize={12}>
        <Text caption="Добавлено альтернативное название" />
        <MarkEvent color="success">{event.value.caption}</MarkEvent>
        <MarkEvent>{event.value.locale.code}</MarkEvent>
      </Box>
    </TemplateEvent>
  )
}

interface AltNameUpdateEventProps extends TemplateEventProps {
  event: UpdateAltNameEvent
  prev: Category
}

export const AltNameUpdateEvent = (props: AltNameUpdateEventProps) => {
  const { event, prev, ...other } = props

  const findAltName = (prev.altNames as (Common.AltNameCreate | Common.AltName)[])
    .find((altName) => altName.id === event.value.id)

  return (
    <TemplateEvent {...other}>
      <Box flex row gap ai fontSize={12}>
        <Text caption="Альтернативное название обновлено" />
        <Box flex row gap={0.25}>
          <MarkEvent color="success">{findAltName?.caption}</MarkEvent>
          <MarkEvent>{findAltName?.locale.code}</MarkEvent>
        </Box>
        <Icon name="arrowRight" />
        <Box flex row gap={0.25}>
          <MarkEvent color="success">{event.value.caption}</MarkEvent>
          <MarkEvent>{event.value.locale.code}</MarkEvent>
        </Box>
      </Box>
    </TemplateEvent>
  )
}

interface AltNameRemoveEventProps extends TemplateEventProps {
  event: RemoveAltNameEvent
  prev: Category
}

export const AltNameRemoveEvent = (props: AltNameRemoveEventProps) => {
  const { event, prev, ...other } = props

  const findAltName = (prev.altNames as (Common.AltNameCreate | Common.AltNameCreate)[])
    .find((altName) => altName.id === event.value)

  return (
    <TemplateEvent {...other}>
      <Box flex row gap ai fontSize={12}>
        <Text caption="Альтернативное название удалено" />
        <Box flex row gap={0.25}>
          <MarkEvent color="success">{findAltName?.caption}</MarkEvent>
          <MarkEvent>{findAltName?.locale.code}</MarkEvent>
        </Box>
      </Box>
    </TemplateEvent>
  )
}

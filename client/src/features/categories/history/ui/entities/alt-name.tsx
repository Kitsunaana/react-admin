import { AddAltNameEvent, RemoveAltNameEvent, UpdateAltNameEvent } from "features/categories/@history/domain/events"
import { Box } from "shared/ui/box"
import { Text } from "shared/ui/text"
import { Category } from "features/categories/@history/model/category-history.store"
import { Icon } from "shared/ui/icon"
import { Common } from "shared/types/common"
import { MarkEvent, TemplateEvent } from "features/categories/@history/ui/base"

interface AltNameAddEventProps {
  event: AddAltNameEvent
}

export const AltNameAddEvent = (props: AltNameAddEventProps) => {
  const { event } = props

  return (
    <TemplateEvent selected={false} onClick={() => {}}>
      <Box flex row gap ai fontSize={12}>
        <Text caption="Добавлено альтернативное название" />
        <MarkEvent color="success">{event.value.caption}</MarkEvent>
        <MarkEvent>{event.value.locale.code}</MarkEvent>
      </Box>
    </TemplateEvent>
  )
}

interface AltNameUpdateEventProps {
  event: UpdateAltNameEvent
  prev: Category
}

export const AltNameUpdateEvent = (props: AltNameUpdateEventProps) => {
  const { event, prev } = props

  const findAltName = (prev.altNames as (Common.AltNameCreate | Common.AltName)[])
    .find((altName) => altName.id === event.value.id)

  return (
    <TemplateEvent selected={false} onClick={() => {}}>
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

interface AltNameRemoveEventProps {
  event: RemoveAltNameEvent
  prev: Category
}

export const AltNameRemoveEvent = (props: AltNameRemoveEventProps) => {
  const { event, prev } = props

  const findAltName = (prev.altNames as (Common.AltNameCreate | Common.AltNameCreate)[])
    .find((altName) => altName.id === event.value)

  return (
    <TemplateEvent selected={false} onClick={() => {}}>
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

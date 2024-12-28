import { CategoryLocal } from "shared/types/new_types/types"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import { AddAltNameEvent, RemoveAltNameEvent, UpdateAltNameEvent } from "../../../model/history/events"
import { MarkEvent, TemplateEvent, TemplateEventProps } from "../base"
import { AltNameEventContainer, AltNameEventsBox } from "./styles"

export const AltNameAddEvent = ({
  event,
  ...other
}: TemplateEventProps & {
  event: AddAltNameEvent
}) => (
  <TemplateEvent {...other}>
    <AltNameEventContainer>
      <Text caption="Добавлено альтернативное название" />
      <MarkEvent color="success">{event.value.caption}</MarkEvent>
      <MarkEvent>{event.value.locale.code}</MarkEvent>
    </AltNameEventContainer>
  </TemplateEvent>
)

export const AltNameUpdateEvent = ({
  event,
  prev,
  ...other
}: TemplateEventProps & {
  event: UpdateAltNameEvent
  prev: CategoryLocal
}) => {
  const findAltName = (prev.altNames).find((a) => a.id === event.value.id)

  return (
    <TemplateEvent {...other}>
      <AltNameEventContainer>
        <Text caption="Альтернативное название обновлено" />
        <AltNameEventsBox>
          <MarkEvent color="success">{findAltName?.caption}</MarkEvent>
          <MarkEvent>{findAltName?.locale.code}</MarkEvent>
        </AltNameEventsBox>
        <Icon name="arrowRight" />
        <AltNameEventsBox>
          <MarkEvent color="success">{event.value.caption}</MarkEvent>
          <MarkEvent>{event.value.locale.code}</MarkEvent>
        </AltNameEventsBox>
      </AltNameEventContainer>
    </TemplateEvent>
  )
}

export const AltNameRemoveEvent = ({
  event,
  prev,
  ...other
}: TemplateEventProps & {
  event: RemoveAltNameEvent
  prev: CategoryLocal
}) => {
  const findAltName = prev.altNames.find((a) => a.id === event.value)

  return (
    <TemplateEvent {...other}>
      <AltNameEventContainer>
        <Text caption="Альтернативное название удалено" />
        <AltNameEventsBox>
          <MarkEvent color="error">{findAltName?.caption}</MarkEvent>
          <MarkEvent>{findAltName?.locale.code}</MarkEvent>
        </AltNameEventsBox>
      </AltNameEventContainer>
    </TemplateEvent>
  )
}

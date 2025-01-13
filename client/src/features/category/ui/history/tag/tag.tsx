import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import { CategoryLocal } from "../../../domain/category/types"
import { AddTagEvent, RemoveTagEvent, UpdateTagEvent } from "../../../view-model/history/events"
import { MarkEvent, TemplateEvent, TemplateEventProps } from "../base"
import { TagEventContainer, TagEventsBox } from "./styles"

export const TagAddEvent = ({
  event,
  ...other
}: & TemplateEventProps & {
  event: AddTagEvent
}) => (
  <TemplateEvent {...other}>
    <TagEventContainer>
      <Text caption="Добавлен тег" />
      <MarkEvent color="success">{event.value.caption}</MarkEvent>
    </TagEventContainer>
  </TemplateEvent>
)

export const TagUpdateEvent = ({
  event,
  prev,
  ...other
}: TemplateEventProps & {
  prev: CategoryLocal
  event: UpdateTagEvent
}) => {
  const findTag = prev.tags.find((t) => t.id === event.value.id)

  return (
    <TemplateEvent {...other}>
      <TagEventContainer>
        <Text caption="Тег обновлен" />
        <MarkEvent color="warning">{findTag?.caption}</MarkEvent>
        <Icon name="arrowRight" />
        <MarkEvent color="success">{event.value.caption}</MarkEvent>
      </TagEventContainer>
    </TemplateEvent>
  )
}

export const TagRemoveEvent = ({
  event,
  prev,
  ...other
}: TemplateEventProps & {
  event: RemoveTagEvent
  prev: CategoryLocal
}) => {
  const findTag = prev.tags.find((t) => t.id === event.value)

  return (
    <TemplateEvent {...other}>
      <TagEventContainer>
        <Text caption="Тег удален" />
        <TagEventsBox>
          <MarkEvent color="error">{findTag?.caption}</MarkEvent>
        </TagEventsBox>
      </TagEventContainer>
    </TemplateEvent>
  )
}

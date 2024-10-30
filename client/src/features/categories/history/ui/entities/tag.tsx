import { CategoryDto } from "shared/types/category"
import { Box } from "shared/ui/box"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import { AddTagEvent, RemoveTagEvent, UpdateTagEvent } from "../../domain/events"
import { Category } from "../../domain/types"
import { MarkEvent, TemplateEvent, TemplateEventProps } from "../base"

interface TagAddEventProps extends TemplateEventProps {
  event: AddTagEvent
}

export const TagAddEvent = (props: TagAddEventProps) => {
  const { event, ...other } = props

  return (
    <TemplateEvent {...other}>
      <Box flex row gap ai fontSize={12}>
        <Text caption="Добавлен тег" />
        <MarkEvent color="success">{event.value.caption}</MarkEvent>
      </Box>
    </TemplateEvent>
  )
}

interface TagUpdateEventProps extends TemplateEventProps {
  prev: Category
  event: UpdateTagEvent
}

export const TagUpdateEvent = (props: TagUpdateEventProps) => {
  const { event, prev, ...other } = props

  const findTag = (prev.tags as (CategoryDto.TagCreate | CategoryDto.Tag)[])
    .find((tag) => tag.id === event.value.id)

  return (
    <TemplateEvent {...other}>
      <Box flex row gap={0.5} ai fontSize={12}>
        <Text caption="Тег обновлен" />
        <MarkEvent color="warning">{findTag?.caption}</MarkEvent>
        <Icon name="arrowRight" />
        <MarkEvent color="success">{event.value.caption}</MarkEvent>
      </Box>
    </TemplateEvent>
  )
}

interface TagRemoveEventProps extends TemplateEventProps {
  event: RemoveTagEvent
  prev: Category
}

export const TagRemoveEvent = (props: TagRemoveEventProps) => {
  const { event, prev, ...other } = props

  const findTag = (prev.tags as (CategoryDto.TagCreate | CategoryDto.Tag)[])
    .find((tag) => tag.id === event.value)

  return (
    <TemplateEvent {...other}>
      <Box flex row gap ai fontSize={12}>
        <Text caption="Тег удален" />
        <Box flex row gap={0.25}>
          <MarkEvent color="success">{findTag?.caption}</MarkEvent>
        </Box>
      </Box>
    </TemplateEvent>
  )
}

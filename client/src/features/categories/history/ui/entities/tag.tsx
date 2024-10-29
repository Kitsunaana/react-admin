import { AddTagEvent, RemoveTagEvent, UpdateTagEvent } from "features/categories/@history/domain/events"
import { Box } from "shared/ui/box"
import { Text } from "shared/ui/text"
import { Category } from "features/categories/@history/model/category-history.store"
import { Icon } from "shared/ui/icon"
import { CategoryDto } from "shared/types/category"
import { MarkEvent, TemplateEvent } from "features/categories/@history/ui/base"

interface TagAddEventProps {
  event: AddTagEvent
}

export const TagAddEvent = (props: TagAddEventProps) => {
  const { event } = props

  return (
    <TemplateEvent selected={false} onClick={() => {}}>
      <Box flex row gap ai fontSize={12}>
        <Text caption="Добавлен тег" />
        <MarkEvent color="success">{event.value.caption}</MarkEvent>
      </Box>
    </TemplateEvent>
  )
}

interface TagUpdateEventProps {
  prev: Category
  event: UpdateTagEvent
}

export const TagUpdateEvent = (props: TagUpdateEventProps) => {
  const { event, prev } = props

  const findTag = (prev.tags as (CategoryDto.TagCreate | CategoryDto.Tag)[])
    .find((tag) => tag.id === event.value.id)

  return (
    <TemplateEvent selected={false} onClick={() => {}}>
      <Box flex row gap={0.5} ai fontSize={12}>
        <Text caption="Тег обновлен" />
        <MarkEvent color="warning">{findTag?.caption}</MarkEvent>
        <Icon name="arrowRight" />
        <MarkEvent color="success">{event.value.caption}</MarkEvent>
      </Box>
    </TemplateEvent>
  )
}

interface TagRemoveEventProps {
  event: RemoveTagEvent
  prev: Category
}

export const TagRemoveEvent = (props: TagRemoveEventProps) => {
  const { event, prev } = props

  const findTag = (prev.tags as (CategoryDto.TagCreate | CategoryDto.Tag)[])
    .find((tag) => tag.id === event.value)

  return (
    <TemplateEvent selected={false} onClick={() => {}}>
      <Box flex row gap ai fontSize={12}>
        <Text caption="Тег удален" />
        <Box flex row gap={0.25}>
          <MarkEvent color="success">{findTag?.caption}</MarkEvent>
        </Box>
      </Box>
    </TemplateEvent>
  )
}

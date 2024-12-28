import { createRoute, eventBus } from "shared/lib/event-bus"
import { Tag } from "shared/types/new_types/types"

export const tagCreateEvent = createRoute("tag.create.submit")
  .withParams<Tag>()

export const tagEditEvent = createRoute("tag.edit.submit")
  .withParams<Tag>()

export const tagRemoveEvent = createRoute("tag.remove.submit")
  .withParams<{ data: Tag, callback:(id: string) => void }>()

const openEditModalEvent = createRoute("tag.edit.open")
  .withParams<Tag>()

const openCreateModalEvent = createRoute("tag.create.open")

export const startEditTag = (payload: Tag) => eventBus.emit(openEditModalEvent(payload))

export const startCreateTag = () => eventBus.emit(openCreateModalEvent())

import { createRoute, eventBus } from "shared/lib/event-bus"
import { Tag } from "entities/tag"

// submits
const submitCreateTagEvent = createRoute("tag.create.submit")
  .withParams<Tag>()

const submitEditTagEvent = createRoute("tag.edit.submit")
  .withParams<Tag>()

const submitRemoveTagEvent = createRoute("tag.remove.submit")
  .withParams<string>()

// open modals
const openModalCreateTag = createRoute("tag.edit.open")
  .withParams<Tag>()

const openModalEditTag = createRoute("tag.create.open")

const openModalRemoveTag = createRoute("tag.remove.open")
  .withParams<Tag>()

// subscribes
export const subscribeSubmitCreateTagEvent = (callback: (payload: Tag) => void) => (
  eventBus.on(submitCreateTagEvent, ({ payload }) => callback(payload))
)

export const subscribeSubmitEditTagEvent = (callback: (payload: Tag) => void) => (
  eventBus.on(submitEditTagEvent, ({ payload }) => callback(payload))
)

export const subscribeSubmitRemoveTagEvent = (callback: (id: string) => void) => (
  eventBus.on(submitRemoveTagEvent, ({ payload }) => callback(payload))
)

// actions
export const startCreateTag = () => (
  eventBus.emit(openModalEditTag())
)

export const startEditTag = (payload: Tag) => (
  eventBus.emit(openModalCreateTag(payload))
)

export const startRemoveTag = (data: Tag) => (
  eventBus.emit(openModalRemoveTag(data))
)

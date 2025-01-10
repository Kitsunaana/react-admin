import { createRoute } from "shared/lib/event-bus"
import { Tag } from "entities/tag"

// submits
export const submitCreateTagEvent = createRoute("tag.create.submit")
  .withParams<Tag>()

export const submitEditTagEvent = createRoute("tag.edit.submit")
  .withParams<Tag>()

export const submitRemoveTagEvent = createRoute("tag.remove.submit")
  .withParams<string>()

// open modals
export const openModalCreateTagEvent = createRoute("tag.create.open")

export const openModalEditTagEvent = createRoute("tag.edit.open")
  .withParams<Tag>()

export const openModalRemoveTagEvent = createRoute("tag.remove.open")
  .withParams<Tag>()

import { createRoute } from "shared/lib/event-bus"
import { Tag } from "shared/types/new_types/types"

export const openEditTagDialog = createRoute("openEditTagDialog")
  .withParams<Tag>()

export const openCreateTagDialog = createRoute("openCreateTagDialog")
  .withParams()

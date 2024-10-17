import { createRoute } from "shared/lib/event-bus"
import { CategoryDto } from "shared/types/category"

export const openEditTagDialog = createRoute("openEditTagDialog")
  .withParams<CategoryDto.TagCreate>()

export const openCreateTagDialog = createRoute("openCreateTagDialog")
  .withParams()

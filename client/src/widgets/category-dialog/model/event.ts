import { createRoute } from "shared/lib/event-bus"

export const openCreateCategoryDialog = createRoute("openCreateCategoryDialog")
  .withParams()

export const openEditCategoryDialog = createRoute("openEditCategoryDialog")
  .withParams<{ id: number }>()

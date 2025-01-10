import { createRoute, eventBus } from "shared/lib/event-bus"
import { CategoryLocal } from "../../domain/category/types"

// open modals
export const openModalCreateCategoryEvent = createRoute("category.create.open")
  .withParams()

export const openModalEditCategoryEvent = createRoute("category.edit.open")
  .withParams<{ category: CategoryLocal }>()

// actions
export const startCreateCategory = () => (
  eventBus.emit(openModalCreateCategoryEvent({}))
)

export const startEditCategory = (payload: CategoryLocal) => (
  eventBus.emit(openModalEditCategoryEvent({ category: payload }))
)

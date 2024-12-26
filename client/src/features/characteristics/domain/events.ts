import { createRoute } from "shared/lib/event-bus"
import { Characteristic } from "features/characteristics/domain/types"

export const openCreateModalEvent = createRoute("characteristic.create.open")

export const submitCreateEvent = createRoute("characteristic.create.submit")
  .withParams<Characteristic>()

export const openEditModalEvent = createRoute("characteristic.edit.open")
  .withParams<Characteristic>()

export const submitEditEvent = createRoute("characteristic.edit.submit")
  .withParams<Characteristic>()

export const openRemoveModalEvent = createRoute("characteristic.remove.open")
  .withParams<Characteristic>()

export const submitRemoveEvent = createRoute("characteristic.remove.submit")
  .withParams<{ id: string }>()

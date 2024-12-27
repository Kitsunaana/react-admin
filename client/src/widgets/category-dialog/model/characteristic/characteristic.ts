import { createRoute, eventBus } from "shared/lib/event-bus"
import { Characteristic } from "shared/types/new_types/types"

// events
export const characteristicCreateEvent = createRoute("characteristic.create.submit")
  .withParams<Characteristic>()

export const characteristicEditEvent = createRoute("characteristic.edit.submit")
  .withParams<Characteristic>()

export const characteristicRemoveEvent = createRoute("characteristic.remove.submit")
  .withParams<{ id: string }>()

// open modals
const openEditModalEvent = createRoute("characteristic.edit.open")
  .withParams<Characteristic>()

const openCreateModalEvent = createRoute("characteristic.create.open")

const openRemoveModalEvent = createRoute("characteristic.remove.open")
  .withParams<Characteristic>()

// actions
export const startCreateCharacteristic = () => eventBus.emit(openCreateModalEvent())

export const startEditCharacteristic = (payload: Characteristic) => eventBus.emit(openEditModalEvent(payload))

export const startRemoveCharacteristic = (data: Characteristic) => eventBus.emit(openRemoveModalEvent(data))

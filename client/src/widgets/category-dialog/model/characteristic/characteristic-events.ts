import { createRoute, eventBus } from "shared/lib/event-bus"
import { Characteristic } from "../../domain/characteristic"

// events
export const characteristicCreateEvent = createRoute("characteristic.create.submit")
  .withParams<Characteristic>()

export const characteristicEditEvent = createRoute("characteristic.edit.submit")
  .withParams<Characteristic>()

export const characteristicRemoveEvent = createRoute("characteristic.remove.submit")
  .withParams<{ id: string }>()

// open modals
const openEditModalCharacteristicEvent = createRoute("characteristic.edit.open")
  .withParams<Characteristic>()

const openCreateModalCharacteristicEvent = createRoute("characteristic.create.open")

const openRemoveModalCharacteristicEvent = createRoute("characteristic.remove.open")
  .withParams<Characteristic>()

// actions
export const startCreateCharacteristic = () => eventBus.emit(openCreateModalCharacteristicEvent())

export const startEditCharacteristic = (payload: Characteristic) => (
  eventBus.emit(openEditModalCharacteristicEvent(payload))
)

export const startRemoveCharacteristic = (data: Characteristic) => (
  eventBus.emit(openRemoveModalCharacteristicEvent(data))
)

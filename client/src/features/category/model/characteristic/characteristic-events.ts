import { createRoute, eventBus } from "shared/lib/event-bus"
import { Characteristic } from "entities/characteristic"

// submits
const submitCreateCharacteristicEvent = createRoute("characteristic.create.submit")
  .withParams<Characteristic>()

const submitEditCharacteristicEvent = createRoute("characteristic.edit.submit")
  .withParams<Characteristic>()

const submitRemoveCharacteristicEvent = createRoute("characteristic.remove.submit")
  .withParams<string>()

// open modals
const openModalCreateCharacteristicEvent = createRoute("characteristic.create.open")

const openModalEditCharacteristicEvent = createRoute("characteristic.edit.open")
  .withParams<Characteristic>()

const openModalRemoveCharacteristicEvent = createRoute("characteristic.remove.open")
  .withParams<Characteristic>()

// subscribes
export const subscribeSubmitCreateCharacteristicEvent = (callback: (payload: Characteristic) => void) => {
  eventBus.on(submitCreateCharacteristicEvent, ({ payload }) => callback(payload))
}

export const subscribeSubmitEditCharacteristicEvent = (callback: (payload: Characteristic) => void) => {
  eventBus.on(submitEditCharacteristicEvent, ({ payload }) => callback(payload))
}

export const subscribeSubmitRemoveCharacteristicEvent = (callback: (id: string) => void) => {
  eventBus.on(submitRemoveCharacteristicEvent, ({ payload }) => callback(payload))
}

// actions
export const startCreateCharacteristic = () => (
  eventBus.emit(openModalCreateCharacteristicEvent())
)

export const startEditCharacteristic = (payload: Characteristic) => (
  eventBus.emit(openModalEditCharacteristicEvent(payload))
)

export const startRemoveCharacteristic = (data: Characteristic) => (
  eventBus.emit(openModalRemoveCharacteristicEvent(data))
)

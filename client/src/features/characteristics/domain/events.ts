import { createRoute } from "shared/lib/event-bus"
import { Characteristic } from "entities/characteristic"

// submits
export const submitCreateCharacteristicEvent = createRoute("characteristic.create.submit")
  .withParams<Characteristic>()

export const submitEditCharacteristicEvent = createRoute("characteristic.edit.submit")
  .withParams<Characteristic>()

export const submitRemoveCharacteristicEvent = createRoute("characteristic.remove.submit")
  .withParams<string>()

// open modals
export const openModalCreateCharacteristicEvent = createRoute("characteristic.create.open")

export const openModalEditCharacteristicEvent = createRoute("characteristic.edit.open")
  .withParams<Characteristic>()

export const openModalRemoveCharacteristicEvent = createRoute("characteristic.remove.open")
  .withParams<Characteristic>()

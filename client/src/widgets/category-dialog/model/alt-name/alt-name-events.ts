import { createRoute, eventBus } from "shared/lib/event-bus"
import { AltName } from "entities/alt-name"

// submits
const submitCreateAltNameEvent = createRoute("altName.create.submit")
  .withParams<AltName>()

const submitEditAltNameEvent = createRoute("altName.edit.submit")
  .withParams<AltName>()

const submitRemoveAltNameEvent = createRoute("altName.remove.submit")
  .withParams<string>()

// open modals
const openModalCreateAltNameEvent = createRoute("altName.create.open")
  .withParams<{ altNames: AltName[] }>()

const openModalEditAltNameEvent = createRoute("altName.edit.open")
  .withParams<{ altName: AltName, altNames: AltName[] }>()

const openModalRemoveAltNameEvent = createRoute("altName.remove.open")
  .withParams<AltName>()

// subscribes
export const subscribeSubmitCreateAltNameEvent = (callback: (payload: AltName) => void) => {
  eventBus.on(submitCreateAltNameEvent, ({ payload }) => callback(payload))
}

export const subscribeSubmitEditAltNameEvent = (callback: (payload: AltName) => void) => {
  eventBus.on(submitEditAltNameEvent, ({ payload }) => callback(payload))
}

export const subscribeSubmitRemoveAltNameEvent = (callback: (id: string) => void) => {
  eventBus.on(submitRemoveAltNameEvent, ({ payload }) => callback(payload))
}

// actions
export const startCreateAltName = (altNames: AltName[]) => (
  eventBus.emit(openModalCreateAltNameEvent({ altNames }))
)

export const startEditAltName = (payload: AltName, altNames: AltName[]) => (
  eventBus.emit(openModalEditAltNameEvent({ altName: payload, altNames }))
)

export const startRemoveAltName = (data: AltName) => (
  eventBus.emit(openModalRemoveAltNameEvent(data))
)

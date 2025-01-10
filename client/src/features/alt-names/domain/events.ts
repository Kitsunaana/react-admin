import { createRoute, eventBus } from "shared/lib/event-bus"
import { AltName } from "entities/alt-name"

// open modals
export const openModalCreateAltNameEvent = createRoute("altName.create.open")
  .withParams<{ altNames: AltName[] }>()

export const openModalEditAltNameEvent = createRoute("altName.edit.open")
  .withParams<{ altName: AltName, altNames: AltName[] }>()

export const openModalRemoveAltNameEvent = createRoute("altName.remove.open")
  .withParams<AltName>()

// events
export const submitAltNameCreateEvent = createRoute("altName.create.submit")
  .withParams<AltName>()

export const submitAltNameEditEvent = createRoute("altName.edit.submit")
  .withParams<AltName>()

export const submitAltNameRemoveEvent = createRoute("altName.remove.submit")
  .withParams<string>()

// actions
export const removeAltName = (id: string) => eventBus.emit(submitAltNameRemoveEvent(id))

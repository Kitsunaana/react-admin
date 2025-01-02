import { createRoute, eventBus } from "shared/lib/event-bus"
import { AltName } from "./alt-name-types"

export const openCreateAltNameModalEvent = createRoute("altName.create.open")
  .withParams<{ altNames: AltName[] }>()

export const submitCreateAltNameEvent = createRoute("altName.create.submit")
  .withParams<AltName>()

export const openEditAltNameModalEvent = createRoute("altName.edit.open")
  .withParams<{ altName: AltName, altNames: AltName[] }>()

export const submitEditAltNameEvent = createRoute("altName.edit.submit")
  .withParams<AltName>()

export const openRemoveAltNameModalEvent = createRoute("altName.remove.open")
  .withParams<AltName>()

export const submitRemoveAltNameEvent = createRoute("altName.remove.submit")
  .withParams<string>()

export const removeAltName = (id: string) => eventBus.emit(submitRemoveAltNameEvent(id))

import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { eventBus } from "shared/lib/event-bus"
import { AltName, AltNameFields, Locale } from "entities/alt-name"
import { openModalCreateAltNameEvent, submitAltNameCreateEvent } from "../domain/events"
import { FormLocales } from "../view-model/use-alt-name-form"

class CreateStore {
  isCreating: boolean = false
  altNames: AltName[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })

    eventBus.on(openModalCreateAltNameEvent, ({ payload }) => this.startCreate(payload.altNames))
  }

  startCreate(altNames: AltName[]) {
    this.altNames = altNames
    this.isCreating = true
  }

  cancelCreate() {
    this.isCreating = false
  }

  submitCreate(payload: AltNameFields) {
    this.cancelCreate()

    eventBus.emit(submitAltNameCreateEvent({
      ...payload,
      status: "create",
      id: nanoid(),
    }))
  }

  exclude(locales: Locale[]): FormLocales[] {
    const usedLocaleCodes = this.altNames.map((item) => item.locale.code)

    return locales.map((locale) => (
      usedLocaleCodes.includes(locale.code)
        ? { ...locale, disabled: true }
        : locale
    ))
  }
}

export const altNameCreateStore = new CreateStore()

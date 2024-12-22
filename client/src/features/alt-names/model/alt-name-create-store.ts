import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { createRoute, eventBus } from "shared/lib/event-bus"
import { AltNameFields, AltName, Locale } from "../domain/types"

const openModalEvent = createRoute("altName.create.open")
  .withParams<{ altNames: AltName[] }>()

const submitEvent = createRoute("altName.create.submit")
  .withParams<AltName>()

class AltNameCreateStore {
  isCreating: boolean = false
  altNames: AltName[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })

    eventBus.on(openModalEvent, ({ payload }) => {
      this.altNames = payload.altNames
      this.startCreate()
    })
  }

  exclude(locales: Locale[]) {
    const usedLocaleCodes = this.altNames.map((item) => item.locale.code)

    return locales.map((locale) => (
      usedLocaleCodes.includes(locale.code)
        ? { ...locale, disabled: true }
        : locale
    ))
  }

  startCreate() {
    this.isCreating = true
  }

  cancelCreate() {
    this.isCreating = false
  }

  submitCreate(payload: AltNameFields) {
    this.cancelCreate()

    eventBus.emit(submitEvent({
      ...payload,
      status: "create",
      id: nanoid(),
    }))
  }
}

export const altNameCreateStore = new AltNameCreateStore()

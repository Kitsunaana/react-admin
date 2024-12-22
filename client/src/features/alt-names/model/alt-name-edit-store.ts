import { makeAutoObservable } from "mobx"
import { createRoute, eventBus } from "shared/lib/event-bus"
import { AltName, Locale } from "../domain/types"

const openModalEvent = createRoute("altName.edit.open")
  .withParams<{ payload: AltName, altNames: AltName[] }>()

const submitEvent = createRoute("altName.edit.submit")
  .withParams<AltName>()

class AltNameEditStore {
  isEditing: boolean = false
  altName: AltName | undefined = undefined
  altNames: AltName[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })

    eventBus.on(openModalEvent, ({ payload }) => {
      this.altNames = payload.altNames
      this.startEdit(payload.payload)
    })
  }

  startEdit(characteristic: AltName) {
    this.altName = characteristic
    this.isEditing = true
  }

  cancelEdit() {
    this.altNames = []
    this.isEditing = false
  }

  exclude(locales: Locale[]) {
    const usedLocaleCodes = this.altNames.map((item) => item.locale.code)
    const code = this.altName?.locale.code

    return locales.map((locale) => {
      const isCodesNotEqual = code !== locale.code
      const isCodeNotAvailable = usedLocaleCodes.includes(locale.code)

      if (isCodesNotEqual && isCodeNotAvailable) return { ...locale, disabled: true }

      return locale
    })
  }

  submitEdit(payload: AltName) {
    this.cancelEdit()

    eventBus.emit(submitEvent({
      ...payload,
      status: payload.status === "create" ? "create" : "update",
    }))
  }
}

export const altNameEditStore = new AltNameEditStore()

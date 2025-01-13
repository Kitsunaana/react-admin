import { makeAutoObservable } from "mobx"
import { eventBus } from "shared/lib/event-bus"
import { AltName, Locale } from "entities/alt-name"
import { openModalEditAltNameEvent, submitAltNameEditEvent } from "../domain/events"
import { FormLocales } from "../view-model/use-alt-name-form"

class EditStore {
  isEditing: boolean = false

  altName: AltName | undefined = undefined
  altNames: AltName[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })

    eventBus.on(openModalEditAltNameEvent, ({ payload }) => (
      this.startEdit(payload.altName, payload.altNames)
    ))
  }

  startEdit(altName: AltName, altNames: AltName[]) {
    this.altName = altName
    this.altNames = altNames

    this.isEditing = true
  }

  cancelEdit() {
    this.altNames = []
    this.isEditing = false
  }

  submitEdit(payload: AltName) {
    this.cancelEdit()

    eventBus.emit(submitAltNameEditEvent({
      ...payload,
      status: payload.status === "create" ? "create" : "update",
    }))
  }

  exclude(locales: Locale[]): FormLocales[] {
    const usedLocaleCodes = this.altNames.map((item) => item.locale.code)
    const code = this.altName?.locale.code

    return locales.map((locale) => {
      const isCodesNotEqual = code !== locale.code
      const isCodeNotAvailable = usedLocaleCodes.includes(locale.code)

      if (isCodesNotEqual && isCodeNotAvailable) return { ...locale, disabled: true }

      return locale
    })
  }
}

export const altNameEditStore = new EditStore()

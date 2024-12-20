import { makeAutoObservable } from "mobx"
import { createRoute, eventBus } from "shared/lib/event-bus"
import { Characteristic } from "../domain/types"

const openModalEvent = createRoute("characteristic.edit.open")
  .withParams<Characteristic>()

const submitEvent = createRoute("characteristic.edit.submit")
  .withParams<Characteristic>()

class CharacteristicEditStore {
  isEditing: boolean = false
  characteristic: Characteristic | undefined = undefined

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })

    eventBus.on(openModalEvent, ({ payload }) => this.startEdit(payload))
  }

  startEdit(characteristic: Characteristic) {
    this.characteristic = characteristic
    this.isEditing = true
  }

  cancelEdit() {
    this.characteristic = undefined
    this.isEditing = false
  }

  submitEdit(payload: Characteristic) {
    this.cancelEdit()

    eventBus.emit(submitEvent({
      ...payload,
      status: payload.status === "create" ? "create" : "update",
    }))
  }
}

export const characteristicEditStore = new CharacteristicEditStore()

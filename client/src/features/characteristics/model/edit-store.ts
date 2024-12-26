import { makeAutoObservable } from "mobx"
import { eventBus } from "shared/lib/event-bus"
import { Characteristic } from "../domain/types"
import { openEditModalEvent, submitEditEvent } from "../domain/events"

class EditStore {
  isEditing: boolean = false
  characteristic: Characteristic | undefined = undefined

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })

    eventBus.on(openEditModalEvent, ({ payload }) => this.startEdit(payload))
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

    eventBus.emit(submitEditEvent({
      ...payload,
      status: payload.status === "create" ? "create" : "update",
    }))
  }
}

export const editStore = new EditStore()

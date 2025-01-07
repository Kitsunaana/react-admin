import { makeAutoObservable } from "mobx"
import { eventBus } from "shared/lib/event-bus"
import { Characteristic } from "entities/characteristic"
import { openModalEditCharacteristicEvent, submitEditCharacteristicEvent } from "../domain/events"

class EditStore {
  public isEditing: boolean = false
  public characteristic: Characteristic | undefined = undefined

  public constructor() {
    makeAutoObservable(this, {}, { autoBind: true })

    eventBus.on(openModalEditCharacteristicEvent, ({ payload }) => this.startEdit(payload))
  }

  public startEdit(characteristic: Characteristic) {
    this.characteristic = characteristic
    this.isEditing = true
  }

  public cancelEdit() {
    this.characteristic = undefined
    this.isEditing = false
  }

  public submitEdit(payload: Characteristic) {
    this.cancelEdit()

    eventBus.emit(submitEditCharacteristicEvent({
      ...payload,
      status: payload.status === "create" ? "create" : "update",
    }))
  }
}

export const editStore = new EditStore()

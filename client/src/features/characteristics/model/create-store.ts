import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { eventBus } from "shared/lib/event-bus"
import { CharacteristicFields } from "../domain/types"
import { submitCreateEvent, openCreateModalEvent } from "../domain/events"

class CreateStore {
  isCreating: boolean = false

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })

    eventBus.on(openCreateModalEvent, this.startCreate)
  }

  startCreate() {
    this.isCreating = true
  }

  cancelCreate() {
    this.isCreating = false
  }

  submitCreate(payload: CharacteristicFields) {
    this.cancelCreate()

    eventBus.emit(submitCreateEvent({
      ...payload,
      status: "create",
      id: nanoid(),
    }))
  }
}

export const createStore = new CreateStore()

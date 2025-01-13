import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { eventBus } from "shared/lib/event-bus"
import { CharacteristicFields } from "entities/characteristic"
import { submitCreateCharacteristicEvent, openModalCreateCharacteristicEvent } from "../domain/events"

class CreateStore {
  public isCreating: boolean = false

  public constructor() {
    makeAutoObservable(this, {}, { autoBind: true })

    eventBus.on(openModalCreateCharacteristicEvent, this.startCreate)
  }

  public startCreate() {
    this.isCreating = true
  }

  public cancelCreate() {
    this.isCreating = false
  }

  public submitCreate(payload: CharacteristicFields) {
    this.cancelCreate()

    eventBus.emit(submitCreateCharacteristicEvent({
      ...payload,
      status: "create",
      id: nanoid(),
    }))
  }
}

export const createStore = new CreateStore()

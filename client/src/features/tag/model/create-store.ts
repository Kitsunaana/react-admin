import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { eventBus } from "shared/lib/event-bus"
import { TagFields } from "entities/tag"
import { openModalCreateTagEvent, submitCreateTagEvent } from "../domain/events"

class CreateStore {
  isCreating: boolean = false

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })

    eventBus.on(openModalCreateTagEvent, this.startCreate)
  }

  startCreate() {
    this.isCreating = true
  }

  cancelCreate() {
    this.isCreating = false
  }

  submitCreate(payload: TagFields) {
    this.cancelCreate()

    eventBus.emit(submitCreateTagEvent({
      ...payload,
      status: "create",
      id: nanoid(),
    }))
  }
}

export const tagCreateStore = new CreateStore()

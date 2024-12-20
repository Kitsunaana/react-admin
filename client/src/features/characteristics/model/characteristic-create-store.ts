import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { createRoute, eventBus } from "shared/lib/event-bus"
import { Characteristic, CharacteristicFields } from "../domain/types"

const openModalEvent = createRoute("characteristic.create.open")
const submitEvent = createRoute("characteristic.create.submit")
  .withParams<Characteristic>()

class CharacteristicCreateStore {
  isCreating: boolean = false

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })

    eventBus.on(openModalEvent, this.startCreate)
  }

  startCreate() {
    this.isCreating = true
  }

  cancelCreate() {
    this.isCreating = false
  }

  submitCreate(payload: CharacteristicFields) {
    this.cancelCreate()

    eventBus.emit(submitEvent({
      ...payload,
      status: "create",
      id: nanoid(),
    }))
  }
}

export const characteristicCreateStore = new CharacteristicCreateStore()

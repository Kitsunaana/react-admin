import { makeAutoObservable } from "mobx"
import { createRoute, eventBus } from "shared/lib/event-bus"

const openModalEvent = createRoute("category.create.open")
  .withParams()

export class CategoryCreateStore {
  isCreating = false

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
}

export const categoryCreateStore = new CategoryCreateStore()

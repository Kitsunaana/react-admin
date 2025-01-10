import { makeAutoObservable } from "mobx"
import { eventBus } from "shared/lib/event-bus"
import { openModalCreateCategoryEvent } from "./category-events"

export class CategoryCreateStore {
  isCreating = false

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })

    eventBus.on(openModalCreateCategoryEvent, this.startCreate)
  }

  startCreate() {
    this.isCreating = true
  }

  cancelCreate() {
    this.isCreating = false
  }
}

export const categoryCreateStore = new CategoryCreateStore()

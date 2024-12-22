import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { createRoute, eventBus } from "shared/lib/event-bus"
import { Tag, TagFields } from "../domain/types"

const openModalEvent = createRoute("tag.create.open")

const submitEvent = createRoute("tag.create.submit")
  .withParams<Tag>()

class TagCreateStore {
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

  submitCreate(payload: TagFields) {
    this.cancelCreate()

    eventBus.emit(submitEvent({
      ...payload,
      status: "create",
      id: nanoid(),
    }))
  }
}

export const tagCreateStore = new TagCreateStore()

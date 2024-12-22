import { makeAutoObservable } from "mobx"
import { createRoute, eventBus } from "shared/lib/event-bus"
import { Tag } from "../domain/types"

const openModalEvent = createRoute("tag.edit.open")
  .withParams<Tag>()

const submitEvent = createRoute("tag.edit.submit")
  .withParams<Tag>()

class TagEditStore {
  isEditing: boolean = false
  tag: Tag | undefined = undefined

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })

    eventBus.on(openModalEvent, ({ payload }) => this.startEdit(payload))
  }

  startEdit(tag: Tag) {
    this.tag = tag
    this.isEditing = true
  }

  cancelEdit() {
    this.isEditing = false
  }

  submitEdit(payload: Tag) {
    this.cancelEdit()

    eventBus.emit(submitEvent({
      ...payload,
      status: payload.status === "create" ? "create" : "update",
    }))
  }
}

export const tagEditStore = new TagEditStore()

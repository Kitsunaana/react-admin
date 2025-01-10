import { makeAutoObservable } from "mobx"
import { eventBus } from "shared/lib/event-bus"
import { Tag } from "entities/tag"
import { openModalEditTagEvent, submitEditTagEvent } from "../domain/events"

class EditStore {
  isEditing: boolean = false
  tag: Tag | undefined = undefined

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })

    eventBus.on(openModalEditTagEvent, ({ payload }) => this.startEdit(payload))
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

    eventBus.emit(submitEditTagEvent({
      ...payload,
      status: payload.status === "create" ? "create" : "update",
    }))
  }
}

export const tagEditStore = new EditStore()

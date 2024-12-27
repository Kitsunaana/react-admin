import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { Characteristic } from "shared/types/new_types/types"
import { eventBus } from "shared/lib/event-bus"
import { RecordEvent } from "../../model/history/events"
import { ListMethods } from "../list"
import {
  characteristicCreateEvent,
  characteristicEditEvent, characteristicRemoveEvent,
} from "./characteristic"
import { PasteAction } from "../../domain/settings"

export class CharacteristicStore {
  constructor(
    private recordEvent: RecordEvent,
    public list: ListMethods<Characteristic>,
  ) {
    makeAutoObservable(this, {}, { autoBind: true })

    eventBus.on(characteristicCreateEvent, ({ payload }) => {
      this.list.create(payload)

      this.recordEvent({
        id: nanoid(),
        type: "addCharacteristic",
        value: payload,
        tab: 3,
      })
    })

    eventBus.on(characteristicEditEvent, ({ payload }) => {
      this.list.edit(payload)

      this.recordEvent({
        id: nanoid(),
        type: "updateCharacteristic",
        value: payload,
        tab: 3,
      })
    })

    eventBus.on(characteristicRemoveEvent, ({ payload }) => {
      this.list.remove(payload.id)

      this.recordEvent({
        id: nanoid(),
        type: "removeCharacteristic",
        value: payload.id,
        tab: 3,
      })
    })
  }

  isAlreadyExists(data: Characteristic) {
    return Boolean(
      this.list.array.find((c) => c.caption === data.caption && c.id !== data.id),
    )
  }

  isCreatedOrUpdated(data: Characteristic) {
    return data.status === "create" || data.status === "update"
  }

  getItemsCaption(items: Characteristic[]) {
    return items.map((c) => c.caption)
  }

  getFilteredItems = (items: Characteristic[], excludeItems: Characteristic[]) => {
    const captionItems = this.getItemsCaption(items)

    return excludeItems.filter((item) => !captionItems.includes(item.caption))
  }

  createItems(data: Characteristic) {
    this.list.create({ ...data, status: "create", id: nanoid() })
  }

  removeAll() {
    this.list.array.forEach((c) => this.list.remove(c.id))
  }

  addItems(items: Characteristic[]) {
    this
      .getFilteredItems(this.list.array, items)
      .map(this.createItems)
  }

  replaceItems(items: Characteristic[]) {
    this.removeAll()

    items.forEach(this.createItems)
  }

  getState(data: Characteristic) {
    const isCreatedOrUpdated = this.isCreatedOrUpdated(data)
    const hasConflict = this.isAlreadyExists(data)

    return hasConflict ? "error" : (isCreatedOrUpdated && "warning")
  }

  setCopied(action: PasteAction, data: Characteristic[]) {
    if (action === "add") return this.addItems(data)
    if (action === "replace") return this.replaceItems(data)
  }
}

import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { Characteristic } from "shared/types/new_types/types"
import { eventBus } from "shared/lib/event-bus"
import { RecordEvent } from "../../model/history/events"
import { ListMethods } from "../list"
import {
  characteristicCreateEvent,
  characteristicRemoveEvent,
  characteristicEditEvent,
  getFilteredItems,
} from "./characteristic"
import { PasteAction } from "../../domain/settings"

export class CharacteristicStore implements ListMethods<Characteristic> {
  constructor(
    private recordEvent: RecordEvent,
    private list: ListMethods<Characteristic>,
  ) {
    makeAutoObservable(this, {}, { autoBind: true })

    eventBus.on(characteristicCreateEvent, ({ payload }) => {
      this.create(payload)

      this.recordEvent({
        id: nanoid(),
        type: "addCharacteristic",
        value: payload,
        tab: 3,
      })
    })

    eventBus.on(characteristicEditEvent, ({ payload }) => {
      this.edit(payload)

      this.recordEvent({
        id: nanoid(),
        type: "updateCharacteristic",
        value: payload,
        tab: 3,
      })
    })
  }

  get array(): Characteristic[] {
    return this.list.array
  }

  get count() {
    return this.list.count
  }

  get isEmpty() {
    return this.list.isEmpty
  }

  set(data: Characteristic[]) {
    this.list.set(data)
  }

  get() {
    return this.list.get()
  }

  create(payload: Characteristic) {
    this.list.create(payload)
  }

  edit(payload: Characteristic) {
    this.list.edit(payload)
  }

  remove(id: string) {
    this.list.remove(id)
  }

  delete(data: Characteristic) {
    eventBus.emit(characteristicRemoveEvent({
      data,
      callback: (id: string) => {
        this.remove(id)

        this.recordEvent({
          id: nanoid(),
          type: "removeCharacteristic",
          value: id,
          tab: 3,
        })
      },
    }))
  }

  isAlreadyExists(data: Characteristic) {
    return Boolean(
      this.array.find((c) => c.caption === data.caption && c.id !== data.id),
    )
  }

  isCreatedOrUpdated(data: Characteristic) {
    return data.status === "create" || data.status === "update"
  }

  setCopiedCharacteristics(action: PasteAction, data: Characteristic[]) {
    const buildCharacteristic = (data: Characteristic) => {
      this.create({ ...data, status: "create", id: nanoid() })
    }

    const addCopied = (data: Characteristic[]) => (
      getFilteredItems(this.array, data)
        .map(buildCharacteristic)
    )

    const replaceCopied = (data: Characteristic[]) => {
      this.array.forEach((c) => this.remove(c.id))
      data.forEach(buildCharacteristic)
    }

    if (action === "add") return addCopied(data)
    if (action === "replace") return replaceCopied(data)
  }
}

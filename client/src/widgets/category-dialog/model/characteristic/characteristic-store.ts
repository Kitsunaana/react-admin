import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { eventBus } from "shared/lib/event-bus"
import { RecordEvent } from "../../model/history/events"
import { List } from "../list"
import {
  characteristicCreateEvent,
  characteristicEditEvent, characteristicRemoveEvent,
} from "./characteristic-events"
import { PasteAction } from "../../domain/settings"
import { Characteristic } from "../../domain/characteristic"

export class CharacteristicStore {
  constructor(
    private recordEvent: RecordEvent,
    public list: List<Characteristic>,
  ) {
    makeAutoObservable(this, {}, { autoBind: true })

    eventBus.on(characteristicCreateEvent, (event) => this.createCharacteristicEvent(event.payload))
    eventBus.on(characteristicEditEvent, (event) => this.editCharacteristicEvent(event.payload))
    eventBus.on(characteristicRemoveEvent, (event) => this.removeCharacteristicEvent(event.payload))
  }

  get array() {
    return this.list.array
  }

  createCharacteristicEvent(payload: Characteristic) {
    this.list.add(payload)

    this.recordEvent({
      id: nanoid(),
      type: "addCharacteristic",
      value: payload,
      tab: 3,
    })
  }

  editCharacteristicEvent(payload: Characteristic) {
    this.list.edit(payload)

    this.recordEvent({
      id: nanoid(),
      type: "updateCharacteristic",
      value: payload,
      tab: 3,
    })
  }

  removeCharacteristicEvent(data: { id: string }) {
    this.list.remove(data.id)

    this.recordEvent({
      id: nanoid(),
      type: "removeCharacteristic",
      value: data.id,
      tab: 3,
    })
  }

  getState(data: Characteristic) {
    if (this.list.getIsAlreadyExists(data, this.array)) return "error"
    if (this.list.getIsCreatedOrUpdated(data)) return "success"

    return "none"
  }

  setCopiedCharacteristics(action: PasteAction, data: Characteristic[]) {
    if (action === "add") return this.addCopiedCharacteristics(data)

    if (action === "replace") return this.replaceCopiedCharacteristics(data)
  }

  private addCopiedCharacteristics(addedItems: Characteristic[]) {
    const captions = this.list.getCaptions(this.array)
    const filteredItems = this.list.getFilteredItems(captions, addedItems)
    const createdItems = this.list.getCreatedItems(filteredItems, this.list.buildCreateItem)

    this.list.merge(createdItems)
  }

  private replaceCopiedCharacteristics(items: Characteristic[]) {
    this.list.removeAllItems(this.array, this.list.remove)

    this.list.merge(
      this.list.getCreatedItems(items, this.list.buildCreateItem),
    )
  }
}

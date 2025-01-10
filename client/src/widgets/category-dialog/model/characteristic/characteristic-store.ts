import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { Characteristic } from "entities/characteristic"
import { RecordEvent } from "../../view-model/history/events"
import { List } from "../list"
import {
  subscribeSubmitEditCharacteristicEvent,
  subscribeSubmitCreateCharacteristicEvent,
  subscribeSubmitRemoveCharacteristicEvent,
} from "./characteristic-events"
import { PasteAction } from "../../view-model/setting/settings-types"

export class CharacteristicStore {
  constructor(
    private recordEvent: RecordEvent,
    public list: List<Characteristic>,
  ) {
    makeAutoObservable(this, {}, { autoBind: true })

    subscribeSubmitCreateCharacteristicEvent(this.createCharacteristicEvent)
    subscribeSubmitEditCharacteristicEvent(this.editCharacteristicEvent)
    subscribeSubmitRemoveCharacteristicEvent(this.removeCharacteristicEvent)
  }

  public getState(data: Characteristic) {
    if (this.list.getIsAlreadyExists(data, this.list.array)) return "error"
    if (this.list.getIsCreatedOrUpdated(data)) return "success"

    return "none"
  }

  public setCopiedCharacteristics(action: PasteAction, data: Characteristic[]) {
    if (action === "add") return this.addCopiedCharacteristics(data)

    if (action === "replace") return this.replaceCopiedCharacteristics(data)
  }

  private addCopiedCharacteristics(addedItems: Characteristic[]) {
    const captions = this.list.getCaptions(this.list.array)
    const filteredItems = this.list.getFilteredItems(captions, addedItems)

    const createdItems = this.list
      .getCreatedItems(filteredItems, this.list.buildCreateItem)

    this.list.merge(createdItems)
  }

  private replaceCopiedCharacteristics(replacedCharacteristics: Characteristic[]) {
    this.list.removeAllItems(this.list.array, this.list.remove)

    const createdItems = this.list
      .getCreatedItems(replacedCharacteristics, this.list.buildCreateItem)

    this.list.merge(createdItems)
  }

  private createCharacteristicEvent(payload: Characteristic) {
    this.list.add(payload)

    this.recordEvent({
      id: nanoid(),
      type: "addCharacteristic",
      value: payload,
      tab: 3,
    })
  }

  private editCharacteristicEvent(payload: Characteristic) {
    this.list.edit(payload)

    this.recordEvent({
      id: nanoid(),
      type: "updateCharacteristic",
      value: payload,
      tab: 3,
    })
  }

  private removeCharacteristicEvent(id: string) {
    this.list.remove(id)

    this.recordEvent({
      id: nanoid(),
      type: "removeCharacteristic",
      value: id,
      tab: 3,
    })
  }
}

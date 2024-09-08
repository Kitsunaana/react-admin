import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { validation } from "shared/lib/validation"
import { RootStore } from "features/categories/model/stores/dialog-store"
import {
  characteristicsSchema, createCharacteristicsSchema, TCharacteristic, transformCharacteristics,
} from "./schemas"
import { ICharacteristic } from "./types"

export class CharacteristicsStore {
  items: Array<ICharacteristic> = []

  constructor(private getCopyAction: () => string) {
    makeAutoObservable(this, { applyActions: false }, { autoBind: true })
  }

  create(data: ICharacteristic) {
    this.items.push({
      ...data, id: nanoid(), local: true, action: "create",
    })
  }

  edit(data: ICharacteristic) {
    this.items = this.items.map((item) => (item.id === data.id
      ? {
        ...item, ...data, action: "update", local: true,
      }
      : item))
  }

  remove(id: string | number) {
    const removeItem = (item: ICharacteristic) => (item.id === id
      ? (typeof item.id === "string" ? null : { ...item, action: "remove" })
      : item)

    this.items = this.items
      .map(removeItem)
      .filter((item): item is ICharacteristic => item !== null)
  }

  get filteredItems() {
    return this.items.filter((item) => item.action !== "remove")
  }

  getConflict({ caption, id }: Pick<ICharacteristic, "caption" | "id">) {
    return !!this.filteredItems.find((item) => (item.caption === caption && item.id !== id))
  }

  getData(all: boolean = false) {
    return {
      characteristics: (() => (all
        ? this.items
        : this.items.map(({ id, ...other }) => ({
          ...other,
          ...((other?.local && other?.action === "create") ? {} : { id }),
        }))))(),
    }
  }

  applyActions(data: ICharacteristic[]) {
    const action = this.getCopyAction()

    const captionItems = this.items.map((item) => item.caption)
    const filteredCharacteristics = data.filter((item) => !captionItems.includes(item.caption))

    const actions = {
      add: () => filteredCharacteristics.map(this.create),
      replace: () => (this.items = []) && filteredCharacteristics.map(this.create),
      none: () => {},
    }

    return actions[action]
  }

  setCopiedCharacteristics(characteristics: any) {
    const validatedCharacteristics = validation(createCharacteristicsSchema, characteristics)

    this.applyActions(validatedCharacteristics)()
  }

  setCharacteristics(characteristics: any) {
    if (!characteristics) return

    const data = validation(characteristicsSchema, characteristics)
    this.items = transformCharacteristics(data)
  }
}

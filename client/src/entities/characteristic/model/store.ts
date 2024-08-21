import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { validation } from "shared/lib/validation"
import { characteristicsSchema, transformCharacteristics } from "./schemas"
import { ICharacteristic } from "./types"

export class CharacteristicsStore {
  items: Array<ICharacteristic> = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
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
      ? (typeof item.id === "string" ? null : { ...item, deleted: true })
      : item)

    this.items = this.items
      .map(removeItem)
      .filter((item): item is ICharacteristic => item !== null)
  }

  get filteredItems() {
    return this.items.filter((item) => item.deleted !== true)
  }

  getConflict({ caption, id }: Pick<ICharacteristic, "caption" | "id">) {
    return !!this.filteredItems.find((item) => (item.caption === caption && item.id !== id))
  }

  getData() {
    return {
      items: this.items.map(({ id, ...other }) => ({
        ...other,
        ...((other?.local && other?.action === "create") ? {} : { id }),
      })),
    }
  }

  setCharacteristics(characteristics: any) {
    const data = validation(characteristicsSchema, characteristics)
    const transformedCharacteristics = transformCharacteristics(data)

    this.items = [...this.items, ...transformedCharacteristics]
  }
}

import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { validation } from "shared/lib/validation"
import { characteristicsSchema, createCharacteristicsSchema, transformCharacteristics } from "./schemas"
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

  setCharacteristics(characteristics: any) {
    if (!characteristics) return

    const parsedCharacteristics = createCharacteristicsSchema.parse(characteristics)
    if (parsedCharacteristics) {
      const itemsIds = this.items.map((item) => item.id)
      const characteristicsFiltered = parsedCharacteristics.filter((item) => !itemsIds.includes(item.id))

      this.items = [...this.items, ...characteristicsFiltered]
    } else {
      const data = validation(characteristicsSchema, characteristics)
      const transformedData = transformCharacteristics(data)

      this.items = [...this.items, ...transformedData]
    }
  }
}

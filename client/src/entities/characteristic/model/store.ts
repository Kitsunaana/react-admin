import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { Common } from "shared/types/common"
import { isEqual, isNumber, isString } from "shared/lib/utils"
import { ICharacteristic } from "./types"

export type Action = "update" | "create" | "remove"

export type Characteristic = Omit<Common.Characteristic, "id"> & {
  id: string | number
  action?: Action
}

export type CharacteristicCreate = Omit<Common.Characteristic, "id">

export class CharacteristicsStore {
  items: Array<Characteristic> = []

  constructor(private getCopyAction: () => string) {
    makeAutoObservable(this, { applyActions: false }, { autoBind: true })
  }

  create(data: CharacteristicCreate) {
    this.items.push({
      ...data,
      action: "create",
      id: nanoid(),
    })
  }

  edit(data: Characteristic) {
    this.items = this.items.map((item) => (
      item.id !== data.id
        ? item
        : {
          ...item,
          ...data,
          action: "update",
        }
    ))
  }

  remove(id: string | number) {
    this.items = this.items
      .map((item): Characteristic | null => {
        if (isNumber(id) && isEqual(item.id, id)) return { ...item, action: "remove" }
        if (isString(id) && isEqual(item.id, id)) return null

        return item
      })
      .filter((item): item is Characteristic => item !== null)
  }

  get filteredItems() {
    return this.items.filter((item) => item.action !== "remove")
  }

  getConflict({ characteristic, id }: Pick<Characteristic, "characteristic" | "id">) {
    return !!this.filteredItems.find((item) => (
      item.characteristic === characteristic && item.id !== id))
  }

  getData() {
    return {
      characteristics: this.items.map(({ id, ...other }) => ({
        ...other,
        ...(other.action === "create" ? { } : { id }),
      })),
    }
  }

  applyActions(data: ICharacteristic[]) {
    // const action = this.getCopyAction()
    //
    // const captionItems = this.items.map((item) => item.caption)
    // const filteredCharacteristics = data.filter((item) => !captionItems.includes(item.caption))
    //
    // const actions = {
    //   add: () => filteredCharacteristics.map(this.create),
    //   replace: () => {
    //     this.items.map(({ id }) => this.remove(id))
    //     data.map(this.create)
    //   },
    //   none: () => {},
    // }
    //
    // return actions[action]
  }

  setCopiedCharacteristics(characteristics: any) {
    // const validatedCharacteristics = validation(createCharacteristicsSchema, characteristics)
    //
    // this.applyActions(validatedCharacteristics)()
  }

  setCharacteristics(characteristics: any) {
    if (!characteristics) return

    this.items = characteristics
  }
}

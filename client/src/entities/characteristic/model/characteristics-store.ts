import { makeAutoObservable, toJS } from "mobx"
import { nanoid } from "nanoid"
import { isEqual, isNumber, isString } from "shared/lib/utils"
import { Common } from "shared/types/common"
import { Action } from "../domain/types"
import { CharacteristicsStoreImpl } from "../domain/interface.store"

export class CharacteristicsStore implements CharacteristicsStoreImpl {
  characteristics: Array<Common.CharacteristicCreate | Common.Characteristic> = []

  constructor() {
    makeAutoObservable(this, { applyActions: false }, { autoBind: true })
  }

  get filteredItems() {
    return this.characteristics.filter((item) => {
      if ("action" in item) return item.action !== "remove"
      return item
    })
  }

  create = (payload: Common.CharacteristicBase & { id: string }) => {
    this.characteristics.push({
      ...payload,
      action: "create",
    })
  }

  edit = (payload: Common.CharacteristicCreate) => {
    this.characteristics = this.characteristics.map((item) => (
      item.id !== payload.id
        ? item
        : {
          ...item,
          ...payload,
          action: isString(payload.id) ? "create" : "update",
        }
    ))
  }

  remove = (id: string | number) => {
    this.characteristics = this.characteristics
      .map((item): Common.CharacteristicCreate | null => {
        if (isNumber(id) && isEqual(item.id, id)) return { ...item, action: "remove" }
        if (isString(id) && isEqual(item.id, id)) return null

        return item
      })
      .filter((item): item is Common.CharacteristicCreate => item !== null)
  }

  isCreatedOrUpdated = (id: number | string) => {
    const findCharacteristics = this.filteredItems.find((tag) => tag.id === id)
    if (findCharacteristics === undefined) return false

    if ("action" in findCharacteristics) {
      return findCharacteristics.action === "create" || findCharacteristics.action === "update"
    }

    return false
  }

  getConflict = (data: Pick<Common.CharacteristicCreate, "caption" | "id">) => (
    !!this.filteredItems.find((item) => (
      item.caption === data.caption && item.id !== data.id
    ))
  )

  getData = () => ({ characteristics: toJS(this.characteristics) })

  applyActions = (characteristics: Common.CharacteristicBase[]) => {
    const captionItems = this.characteristics.map((item) => item.caption)
    const filteredCharacteristics = characteristics.filter((item) => !captionItems.includes(item.caption))

    const actions = {
      none: () => { },
      add: () => filteredCharacteristics.map((item) => this.create({ ...item, id: nanoid() })),
      replace: () => {
        this.characteristics.forEach(({ id }) => this.remove(id))
        characteristics.forEach((item) => this.create({ ...item, id: nanoid() }))
      },
    }

    return actions
  }

  setCopiedCharacteristics(action: Action, characteristics: Common.CharacteristicBase[]) {
    this.applyActions(characteristics)[action]()
  }

  setCharacteristics(characteristics: (Common.Characteristic | Common.CharacteristicCreate)[]) {
    this.characteristics = characteristics
  }
}

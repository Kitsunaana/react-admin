import { makeAutoObservable, toJS } from "mobx"
import { nanoid } from "nanoid"
import { isEqual, isNumber, isString } from "shared/lib/utils"
import { Common } from "shared/types/common"
import { Action } from "./types"

export class CharacteristicsStore {
  characteristics: Array<Common.CharacteristicCreate> = []

  getCopyAction: () => Action

  constructor(getCopyAction: () => Action) {
    this.getCopyAction = getCopyAction

    makeAutoObservable(this, { applyActions: false }, { autoBind: true })
  }

  get filteredItems() {
    return this.characteristics.filter((item) => item.action !== "remove")
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

    return findCharacteristics.action === "create" || findCharacteristics.action === "update"
  }

  getConflict = (payload: Pick<Common.CharacteristicCreate, "caption" | "id">) => (
    !!this.filteredItems.find((item) => (
      item.caption === payload.caption && item.id !== payload.id
    ))
  )

  getData = () => ({ characteristics: toJS(this.characteristics) })

  applyActions = (characteristics: Common.CharacteristicCreate[]) => {
    const action = this.getCopyAction()

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

    return actions[action]
  }

  setCopiedCharacteristics(characteristics: Common.CharacteristicCreate[]) {
    this.applyActions(characteristics)()
  }

  setCharacteristics(characteristics: (Common.Characteristic | Common.CharacteristicCreate)[]) {
    this.characteristics = characteristics
  }
}

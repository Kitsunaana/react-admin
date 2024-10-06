import { makeAutoObservable, toJS } from "mobx"
import { nanoid } from "nanoid"
import { Common } from "shared/types/common"
import { isEqual, isNumber, isString } from "shared/lib/utils"

export class CharacteristicsStore {
  characteristics: Array<Common.CharacteristicCreate> = []

  constructor() {
    makeAutoObservable(this, { applyActions: false }, { autoBind: true })
  }

  create(payload: Common.CharacteristicCreate) {
    this.characteristics.push({
      ...payload,
      action: "create",
      id: nanoid(),
    })
  }

  edit(payload: Common.CharacteristicCreate) {
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

  remove(id: string | number) {
    this.characteristics = this.characteristics
      .map((item): Common.CharacteristicCreate | null => {
        if (isNumber(id) && isEqual(item.id, id)) return { ...item, action: "remove" }
        if (isString(id) && isEqual(item.id, id)) return null

        return item
      })
      .filter((item): item is Common.CharacteristicCreate => item !== null)
  }

  get filteredItems() {
    return this.characteristics.filter((item) => item.action !== "remove")
  }

  isRecordCreatedOrUpdated(id: number | string) {
    const findCharacteristics = this.filteredItems.find((tag) => tag.id === id)
    if (findCharacteristics === undefined) return false

    return findCharacteristics.action === "create" || findCharacteristics.action === "update"
  }

  getConflict(payload: Pick<Common.CharacteristicCreate, "caption" | "id">) {
    return !!this.filteredItems.find((item) => (
      item.caption === payload.caption && item.id !== payload.id))
  }

  getData() {
    return {
      characteristics: toJS(this.characteristics),
    }
  }

  applyActions() {
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

  // setCopiedCharacteristics(characteristics) {
  // const validatedCharacteristics = validation(createCharacteristicsSchema, characteristics)
  //
  // this.applyActions(validatedCharacteristics)()
  // }

  setCharacteristics(characteristics: any) {
    if (!characteristics) return

    this.characteristics = characteristics
  }
}

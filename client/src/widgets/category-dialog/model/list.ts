import { makeAutoObservable, toJS } from "mobx"
import { nanoid } from "nanoid"

type BaseItem = {
  caption: string
  status: "remove" | "create" | "update" | "none"
  id: string
}

export class List<T extends BaseItem> {
  _array: T[] = []

  constructor(list: T[]) {
    this._array = list

    makeAutoObservable(this, {}, { autoBind: true })
  }

  get array() {
    return this._array.filter((item) => item.status !== "remove")
  }

  get count() {
    return this.array.length
  }

  get isEmpty() {
    return this.count === 0
  }

  set(data: T[]) {
    this._array = data
  }

  get() {
    return toJS(this._array)
  }

  merge(list: T[]) {
    this._array = [...this._array, ...list]
  }

  add(payload: T) {
    this._array.push(payload)
  }

  edit(payload: T) {
    this._array = this._array
      .map((item) => (
        item.id !== payload.id
          ? item
          : {
            ...item,
            ...payload,
          }
      ))
  }

  remove(id: string) {
    this._array = this._array
      .map((item): T | null => {
        const equal = item.id === id
        const isCreate = item.status === "create"

        if (!isCreate && equal) return { ...item, status: "remove" }
        if (isCreate && equal) return null

        return item
      })
      .filter((item): item is T => item !== null)
  }

  getIsAlreadyExists(data: T, list: T[]) {
    return Boolean(
      list.find((c) => c.caption === data.caption && c.id !== data.id),
    )
  }

  getIsCreatedOrUpdated(data: T) {
    return data.status === "create" || data.status === "update"
  }

  getCaptions(items: T[]) {
    return items.map((item) => item.caption)
  }

  getFilteredItems(captions: string[], excludeItems: T[]) {
    return excludeItems.filter((item) => !captions.includes(item.caption))
  }

  buildCreateItem(data: T): T {
    return {
      ...data,
      status: "create",
      id: nanoid(),
    }
  }

  getCreatedItems(items: T[], create: (payload: T) => T) {
    return items.map(create)
  }

  removeAllItems(items: T[], remove: (id: string) => void) {
    items.forEach((item) => remove(item.id))
  }
}

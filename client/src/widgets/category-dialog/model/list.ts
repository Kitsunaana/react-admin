import { makeAutoObservable, toJS } from "mobx"

type BaseItem = {
  status: "remove" | "create" | "update" | "none"
  id: string
}

export interface ListMethods<T extends BaseItem> {
  get array(): T[]
  get count(): number
  get isEmpty(): boolean

  set: (data: T[]) => void
  get: () => T[]

  create: (payload: T) => void
  edit: (payload: T) => void
  remove: (id: string) => void
}

export class List<T extends BaseItem> implements ListMethods<T> {
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

  create(payload: T) {
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
}

import { makeAutoObservable, toJS } from "mobx"
import { CategoryDto } from "shared/types/category"
import { CategoryEvents } from "../domain/events"
import { HistoryStoreImpl } from "../domain/interface-history.store"
import { Category, CategoryWithEvents } from "../domain/types"
import { categoryProducer } from "./category-producer"

export class HistoryStore implements HistoryStoreImpl {
  _category: Category | undefined = undefined

  _events: CategoryEvents[] = []
  _cursor = -1

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setCategory = (category: CategoryDto.CategoryCreate | CategoryDto.CategoryDto) => {
    this._category = { ...category, images: "images" in category ? category.images : [] }
  }

  get events() {
    return this._events.slice(0, this._cursor + 1)
  }

  get currentVersion() {
    return this._events[this._cursor]
  }

  get canUndo() {
    return this._cursor >= 0
  }

  get canRedo() {
    return this._cursor < this._events.length - 1
  }

  get allEvents() {
    return this._events
  }

  moveToVersion = (index: number) => {
    this._cursor = index
  }

  undo = () => {
    this._cursor -= 1
  }

  redo = () => {
    this._cursor = Math.min(this._events.length - 1, this._cursor + 1)
  }

  reset = () => {
    this._events = []
    this._cursor = -1
  }

  recordEvent = (event: CategoryEvents) => {
    this._events = [...this._events.slice(0, this._cursor + 1), event]

    this._cursor = this._events.length - 1
  }

  get category(): Category {
    if (this._category === undefined) throw new Error("Category is not defined")
    if (this.events.length === 0) return toJS(this._category)

    return this.events
      .reduce(categoryProducer, toJS(this._category) as Category)
  }

  get categoryWithEvents(): CategoryWithEvents[] {
    const result: CategoryWithEvents[] = []

    let lastData = this._category
    if (lastData === undefined) return result

    // eslint-disable-next-line no-restricted-syntax
    for (const event of this.allEvents) {
      const newData = categoryProducer(toJS(lastData), event)
      result.push({ newData, lastData, event })
      lastData = newData
    }

    return result
  }
}

import { makeAutoObservable } from "mobx"
import { CategoryDto } from "shared/types/category"
import { CategoryEvents } from "features/categories/@history/domain/events"

export type Category =
  (
    CategoryDto.CategoryCreate
    | CategoryDto.CategoryDto & { images: CategoryDto.CategoryCreate["images"] }
    )

export class CategoryHistoryStore {
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
}

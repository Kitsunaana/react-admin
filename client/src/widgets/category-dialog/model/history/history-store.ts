import { makeAutoObservable } from "mobx"
import { CategoryLocal } from "shared/types/new_types/types"
import { CategoryEvent } from "./events"
import { producer } from "./producer"

export interface CategoryWithEvents {
  newData: CategoryLocal
  lastData: CategoryLocal
  event: CategoryEvent
}

export class HistoryStore {
  _events: CategoryEvent[] = []
  _cursor = -1

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
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

  recordEvent = (event: CategoryEvent) => {
    this._events = [...this._events.slice(0, this._cursor + 1), event]

    this._cursor = this._events.length - 1
  }

  getCategory(first: CategoryLocal): CategoryLocal {
    if (this.events.length === 0) return first

    return this.events.reduce(producer, first)
  }

  getCategoryWithEvents(first: CategoryLocal): CategoryWithEvents[] {
    const result: CategoryWithEvents[] = []

    let lastData = first

    // eslint-disable-next-line no-restricted-syntax
    for (const event of this.allEvents) {
      const newData = producer(lastData, event)
      result.push({ newData, lastData, event })
      lastData = newData
    }

    return result
  }
}

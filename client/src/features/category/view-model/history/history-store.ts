import { makeAutoObservable } from "mobx"
import { CategoryLocal } from "../../domain/category/types"
import { CategoryEvent } from "./events"
import { producer } from "./producer"
import { CategoryWithEvents } from "./history-core"

export class HistoryStore {
  private _events: CategoryEvent[] = []
  private _cursor = -1

  public constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  public get cursor() {
    return this._cursor
  }

  public get events() {
    return this._events.slice(0, this._cursor + 1)
  }

  public get noOneEvent() {
    return this._events.length === 0
  }

  public get currentVersion() {
    return this._events[this._cursor]
  }

  public get canUndo() {
    return this._cursor >= 0
  }

  public get canRedo() {
    return this._cursor < this._events.length - 1
  }

  public get allEvents() {
    return this._events
  }

  public moveToVersion(index: number) {
    this._cursor = index
  }

  public undo() {
    this._cursor -= 1
  }

  public redo() {
    this._cursor = Math.min(this._events.length - 1, this._cursor + 1)
  }

  public reset() {
    this._events = []
    this._cursor = -1
  }

  public recordEvent(event: CategoryEvent) {
    this._events = [...this._events.slice(0, this._cursor + 1), event]

    this._cursor = this._events.length - 1
  }

  public getCategory(first: CategoryLocal): CategoryLocal {
    if (this.events.length === 0) return first

    return this.events.reduce(producer, first)
  }

  public getCategoryWithEvents(first: CategoryLocal): CategoryWithEvents[] {
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

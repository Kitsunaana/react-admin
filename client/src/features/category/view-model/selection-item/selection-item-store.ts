import { makeAutoObservable } from "mobx"

class SelectionItemStore {
  selection: number | null = null

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  nextItem(max: number) {
    this.selection = this.selection === null
      ? 0
      : (this.selection + 1) % max
  }

  prevItem(max: number) {
    this.selection = this.selection === null
      ? max - 1
      : this.selection > 0 ? this.selection - 1 : max - 1
  }

  isSelection(index: number) {
    if (this.selection === null) return false
    return this.selection === index
  }

  unselect() {
    this.selection = null
  }
}

export const createSelectionItem = () => new SelectionItemStore()

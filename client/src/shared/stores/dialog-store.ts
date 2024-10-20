import { makeAutoObservable } from "mobx"

type Id = null | string | number

export class DialogStore {
  id: Id = null
  tab = 0
  open = false
  fullScreen = false
  localData?: Record<string, any>

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  openDialogV2(payload?: Record<string, any>) {
    this.open = true
    this.localData = payload
  }

  openDialog(id: Id) {
    this.open = true
    this.id = id
    this.tab = 0
  }

  closeDialog() {
    this.id = null
    this.open = false
    this.tab = 0
  }

  onToggleSizeScreen() {
    this.fullScreen = !this.fullScreen
  }

  changeTab(tab: number) { this.tab = tab }
}

export const createDialogStore = () => new DialogStore()

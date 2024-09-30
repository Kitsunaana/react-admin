import { makeAutoObservable } from "mobx"

type Id = null | string | number

export class DialogStore {
  open = false
  id: Id = null
  localData?: Record<string, any>
  tab = 0

  fullScreen = false
  data: any = {}

  constructor() {
    makeAutoObservable(this, { }, { autoBind: true })
  }

  openDialog(id: Id, localData?: Record<string, any>) {
    this.open = true
    this.id = id
    this.localData = localData
  }

  closeDialog() {
    this.id = null
    this.open = false
    this.tab = 0
  }

  onToggleSizeScreen() { this.fullScreen = !this.fullScreen }

  changeTab(tab: number) { this.tab = tab }
}

export const createDialogStore = () => new DialogStore()

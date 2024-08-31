import { makeAutoObservable } from "mobx"

export class DialogStore {
  open = false
  id: null | string | number = null
  localData?: Record<string, any>
  tab = 0

  fullScreen = false
  data: any = {}

  constructor() {
    makeAutoObservable(this, { }, { autoBind: true })
  }

  openDialog(id: number | string | null, localData?: Record<string, any>) {
    this.open = true
    this.id = id
    this.localData = localData
  }

  closeDialog() {
    this.id = null
    this.open = false
  }

  setFullScreen(fullScreen: boolean | ((fullScreen: boolean) => boolean)) {
    this.fullScreen = typeof fullScreen === "boolean"
      ? fullScreen
      : fullScreen(this.fullScreen)
  }

  changeTab(tab: number) {
    this.tab = tab
  }
}

export const createDialogStore = () => new DialogStore()

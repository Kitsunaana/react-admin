import { makeAutoObservable } from "mobx"

export class ModalStore {
  tab = 0
  fullscreen = false

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  onToggleFullscreen() {
    this.fullscreen = !this.fullscreen
  }

  changeTab(tab: number) {
    this.tab = tab
  }

  start(defaultValue: number = 0) {
    this.changeTab(defaultValue)
  }
}

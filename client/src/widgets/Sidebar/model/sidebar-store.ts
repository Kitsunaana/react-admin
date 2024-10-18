import { makeAutoObservable } from "mobx"

class SidebarStore {
  open: boolean = false

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })

    const readOpenPanel = localStorage.getItem("openPanel") ?? 1
    this.open = !!(readOpenPanel === "0" ? 0 : 1)
  }

  onToggle = () => {
    this.open = !this.open

    localStorage.setItem("openPanel", `${Number(this.open)}`)
  }
}

export const sidebarStore = new SidebarStore()

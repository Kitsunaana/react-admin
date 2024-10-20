import { makeAutoObservable } from "mobx"
import i18n from "shared/config/translate"
import {
  DefaultSettings, IconSettings, Languages, Themes,
} from "./types"
import { defaultIconSettings, defaultLanguage, defaultTheme } from "./const"

export class SettingsStore {
  language: Languages = defaultLanguage
  theme: Themes = defaultTheme
  iconSettings: IconSettings = defaultIconSettings

  constructor(defaultValues: DefaultSettings) {
    makeAutoObservable(this, {}, { autoBind: true })

    Object.assign(this, defaultValues)
  }

  onChangeLanguage = (language: Languages) => {
    this.language = language

    i18n.changeLanguage(language)

    localStorage.setItem("lngAdmin", language)
  }

  onChangeTheme = (theme: Themes) => {
    this.theme = theme

    localStorage.setItem("theme", theme)
  }

  onChangeIconSettings = (iconSettings: Partial<IconSettings>) => {
    this.iconSettings = {
      ...this.iconSettings,
      ...iconSettings,
    }

    localStorage.setItem("iconSettings", JSON.stringify(this.iconSettings))
  }

  get mode() {
    return this.theme === "dark" ? "dark" : this.theme === "light" ? "light" : "light"
  }
}

export const createSettingsStore = (defaultValues: DefaultSettings) => (
  new SettingsStore(defaultValues)
)

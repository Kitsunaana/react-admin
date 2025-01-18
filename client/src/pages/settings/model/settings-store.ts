import { makeAutoObservable } from "mobx"
import i18n from "shared/config/translate"
import {
  AppSettingsImpl, DefaultAppSettings, IconSettings, Theme,
} from "shared/lib/app-settings"
import { defaultIconSettings, defaultLanguage, defaultTheme } from "../domain/const"

export class SettingsStore implements AppSettingsImpl {
  public language: string = defaultLanguage
  public theme: Theme = defaultTheme
  public iconSettings: IconSettings = defaultIconSettings

  public constructor(defaultValues: DefaultAppSettings) {
    makeAutoObservable(this, {}, { autoBind: true })

    Object.assign(this, defaultValues)
  }

  public changeLanguage = (language: string) => {
    this.language = language
    i18n.changeLanguage(language)
    localStorage.setItem("lngAdmin", language)
  }

  public changeTheme = (theme: Theme) => {
    this.theme = theme
    localStorage.setItem("theme", theme)
  }

  public changeIconSettings = (iconSettings: Partial<IconSettings>) => {
    this.iconSettings = { ...this.iconSettings, ...iconSettings }
    localStorage.setItem("iconSettings", JSON.stringify(this.iconSettings))
  }

  public get mode() {
    return this.theme === "dark"
      ? "dark"
      : this.theme === "light"
        ? "light"
        : defaultTheme
  }
}

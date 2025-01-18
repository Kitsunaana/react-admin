import { FC, PropsWithChildren, useState } from "react"
import { getDefaultValue } from "shared/lib/local-storage"
import { AppSettingsContext, IconSettings, Theme } from "shared/lib/app-settings"
import { defaultSettings } from "../domain/const"
import { iconSettingsSchema, languageSchema, themeSchema } from "../domain/schemas"
import { SettingsStore } from "./settings-store"

export const AppSettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const settings = { ...defaultSettings }

  getDefaultValue<Theme>({
    key: "theme",
    schema: themeSchema,
    onSuccess: (theme) => {
      settings.theme = theme
    },
  })

  getDefaultValue<string>({
    key: "lngAdmin",
    schema: languageSchema,
    onSuccess: (language) => {
      settings.language = language
    },
  })

  getDefaultValue<IconSettings>({
    key: "iconSettings",
    parse: true,
    schema: iconSettingsSchema,
    onSuccess: (iconSettings) => {
      settings.iconSettings = iconSettings
    },
  })

  const [store] = useState<SettingsStore>(new SettingsStore(settings))

  return (
    <AppSettingsContext.Provider value={store}>
      {children}
    </AppSettingsContext.Provider>
  )
}

import {
  createContext,
  FC, PropsWithChildren, useContext,
  useState,
} from "react"
import { ErrorReject, getDefaultValue } from "shared/lib/local-storage"
import { defaultSettings } from "./const"
import { iconSettingsSchema, languageSchema, themeSchema } from "./schemas"
import { createSettingsStore, SettingsStore } from "./settings-store"
import {
  IconSettings, Languages,
  Themes,
} from "./types"

type UseSettings = { settings: SettingsStore }

export const SettingsContext = createContext<UseSettings>(
  { settings: createSettingsStore(defaultSettings) },
)

export const SettingsContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const settings = { ...defaultSettings }
  const errors: Partial<Record<string, ErrorReject>> = {}

  getDefaultValue<Themes>({
    key: "theme",
    schema: themeSchema,
    onSuccess: (theme) => {
      settings.theme = theme
    },
    onError: (error) => {
      errors[error.name] = error
    },
  })

  getDefaultValue<Languages>({
    key: "lngAdmin",
    schema: languageSchema,
    onSuccess: (language) => {
      settings.language = language
    },
    onError: (error) => {
      errors[error.name] = error
    },
  })

  getDefaultValue<IconSettings>({
    key: "iconSettings",
    schema: iconSettingsSchema,
    parse: true,
    onSuccess: (iconSettings) => {
      settings.iconSettings = iconSettings
    },
    onError: (error) => {
      errors[error.name] = error
    },
  })

  const [store] = useState<UseSettings>({ settings: createSettingsStore(settings) })

  return (
    <SettingsContext.Provider value={store}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)

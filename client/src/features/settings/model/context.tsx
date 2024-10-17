import { useMediaQuery } from "@mui/material"
import {
  createContext,
  FC, PropsWithChildren, useContext, useLayoutEffect, useState,
} from "react"
import { toast } from "react-toastify"
import { ErrorReject, getDefaultValue } from "../lib/get-default-value"
import { DEFAULT_SETTINGS, messages } from "./const"
import { iconSettingsSchema, languageSchema, themeSchema } from "./schemas"
import { createSettingsStore, SettingsStore } from "./settings-store"
import {
  DefaultSettings, IconSettings, Languages,
  Themes,
} from "./types"

export const SettingsContext = createContext<SettingsStore>(
  createSettingsStore(DEFAULT_SETTINGS as DefaultSettings),
)

export const SettingsContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-schemas: dark)")

  const getTheme = (mode: string) => (
    mode === "system" ? (prefersDarkMode ? "dark" : "light") : mode
  )

  const [store, setStore] = useState<SettingsStore | null>(
    createSettingsStore(DEFAULT_SETTINGS as DefaultSettings),
  )

  const showToast = (error: ErrorReject) => {
    const mode = getTheme(DEFAULT_SETTINGS.theme)

    toast[error.type](error.message, {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: false,
      theme: mode,
    })
  }

  useLayoutEffect(() => {
    (async () => {
      await Promise.all(
        [
          getDefaultValue<Themes>(themeSchema, "theme", messages.theme)
            .then((theme) => { DEFAULT_SETTINGS.theme = theme })
            .catch(showToast),

          getDefaultValue<Languages>(languageSchema, "lngAdmin", messages.language)
            .then((language) => { DEFAULT_SETTINGS.language = language })
            .catch(showToast),

          getDefaultValue<IconSettings>(iconSettingsSchema, "iconSettings", messages.icon, true)
            .then((icon) => { DEFAULT_SETTINGS.iconSettings = icon })
            .catch(showToast),
        ],
      )

      setStore(createSettingsStore(DEFAULT_SETTINGS as DefaultSettings))
    })()
  }, [])

  return (
    <SettingsContext.Provider value={store as SettingsStore}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)

import { createStrictContext, useStrictContext } from "shared/lib/react"

export type Theme = "dark" | "light" | "system"

export type IconSettings = {
  weightIcon?: number
  fillIcon?: number
}

export type DefaultAppSettings = {
  language: string,
  theme: Theme,
  iconSettings: IconSettings
}

export interface AppSettingsImpl {
  theme: Theme
  language: string,
  iconSettings: IconSettings
  changeLanguage: (language: string) => void
  changeTheme: (theme: Theme) => void
  changeIconSettings: (iconSettings: IconSettings) => void

  get mode(): "dark" | "light"
}

export const AppSettingsContext = createStrictContext<AppSettingsImpl>()

export const useAppSettings = <T = AppSettingsImpl, >(getState?: (store: AppSettingsImpl) => T): T => {
  const store = useStrictContext(AppSettingsContext)

  if (getState) return getState(store)
  return store as T
}

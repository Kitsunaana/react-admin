import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import i18n from "i18next"

export type Themes = "dark" | "light" | "system"

export interface SettingsState {
  weightIcon: number
  fillIcon: number
  language: string
  theme: Themes
}

export interface ChangeTheme {
  theme: Themes
}

export interface ChangeLanguage {
  language: "ru" | "en"
}

export interface ChangeIconSettings {
  weightIcon?: number
  fillIcon?: number
}

const readMode = localStorage.getItem("theme")

const initialState: SettingsState = {
  language: localStorage.getItem("lngAdmin") ?? "en",
  theme: (["dark", "light"].includes(readMode as string) ? readMode : "system") as Themes,
  weightIcon: Number(localStorage.getItem("weightIcon") ?? 200),
  fillIcon: Number(localStorage.getItem("fillIcon") ?? 0),
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<ChangeTheme>) => {
      state.theme = action.payload.theme

      localStorage.setItem("theme", action.payload.theme)
    },

    changeLanguage: (state, action: PayloadAction<ChangeLanguage>) => {
      const { language } = action.payload
      state.language = language

      i18n.changeLanguage(language)

      localStorage.setItem("lngAdmin", language)
    },

    changeIconSettings: (state, action: PayloadAction<ChangeIconSettings>) => {
      Object.entries(action.payload).map(([key, value]) => {
        if (!value && value !== 0) return

        state[key] = value
        localStorage.setItem(key, `${value}`)
      })
    },
  },
})

export const { changeTheme, changeLanguage, changeIconSettings } = settingsSlice.actions

export default settingsSlice.reducer

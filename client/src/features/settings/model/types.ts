export type Languages = "ru" | "en"

export type Themes = "dark" | "light" | "system"

export type IconSettings = {
  weightIcon: number
  fillIcon: number
}

export interface DefaultSettings {
  language: Languages,
  theme: Themes,
  iconSettings: IconSettings
}

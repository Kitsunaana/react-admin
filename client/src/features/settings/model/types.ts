export type Languages = "ru" | "en"

export type Themes = "dark" | "light" | "system"

export type IconSettings = {
  weightIcon: number
  fillIcon: number
}

export interface Messages {
  errorMessage?: string
  notFound?: string
}

export type Settings = "icon" | "theme" | "language"

export interface DefaultSettings {
  language: Languages,
  theme: Themes,
  iconSettings: IconSettings
}

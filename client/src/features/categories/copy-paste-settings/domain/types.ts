import { initialSettingsFields, initialSettingsRows } from "./const"

export type Action = "add" | "replace" | "none"
export type KeysSettingsFields = keyof typeof initialSettingsFields
export type KeysSettingsRows = keyof typeof initialSettingsRows
export type Settings = typeof initialSettingsRows & typeof initialSettingsFields

export type Tabs = "characteristics" | "images" | "tags"

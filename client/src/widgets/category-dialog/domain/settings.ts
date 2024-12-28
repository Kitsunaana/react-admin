import { z } from "zod"
import { initialSettingsFields, initialSettingsRows } from "./const"

export type PasteAction = "add" | "replace" | "none"
export type KeysSettingsFields = keyof typeof initialSettingsFields
export type KeysSettingsRows = keyof typeof initialSettingsRows

export type Tabs = "characteristics" | "images" | "tags"

export type SettingsRecord = {
  activeImageId: boolean,
  bgColor: boolean,
  blur: boolean,
  caption: boolean,
  captionPosition: boolean,
  color: boolean,
  description: boolean,
  isShowPhotoWithGoods: boolean,
  characteristics: PasteAction,
  images: PasteAction,
  tags: PasteAction,
}

export const enumActions = z.enum(["add", "replace", "none"])
export const settingsRowsSchema = z.object({
  characteristics: enumActions,
  images: enumActions,
  tags: enumActions,
})

export const settingFieldsSchema = z.object({
  activeImageId: z.boolean(),
  bgColor: z.boolean(),
  blur: z.boolean(),
  caption: z.boolean(),
  captionPosition: z.boolean(),
  color: z.boolean(),
  description: z.boolean(),
  isShowPhotoWithGoods: z.boolean(),
})

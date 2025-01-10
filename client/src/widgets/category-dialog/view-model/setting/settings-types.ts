import { z } from "zod"

export type PasteAction = "add" | "replace" | "none"

export type KeysSettingsFields = {
  activeImageId: boolean
  bgColor: boolean
  blur: boolean
  caption: boolean
  captionPosition: boolean
  color: boolean
  description: boolean
  isShowPhotoWithGoods: boolean
}

export type KeysSettingsRows = {
  characteristics: PasteAction
  images: PasteAction
  tags: PasteAction
}

export type SettingsRecord = KeysSettingsFields & KeysSettingsRows

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

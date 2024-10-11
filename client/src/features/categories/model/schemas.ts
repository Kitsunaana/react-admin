import { z } from "zod"

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

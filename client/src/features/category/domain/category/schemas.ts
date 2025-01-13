import { z } from "zod"
import { tagSchema } from "entities/tag"
import { altNameSchema } from "entities/alt-name"
import { categoryFieldsSchema } from "entities/category"
import { characteristicSchema } from "entities/characteristic"

export const captionPositionEnum = z.enum([
  "top-left",
  "top-center",
  "top-right",
  "center-left",
  "center-center",
  "center-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
])

export const mediaSchema = z.object({
  id: z.string(),
  filename: z.string(),
  mimetype: z.string(),
  originalName: z.string(),
  path: z.string(),
  size: z.number(),
  order: z.number().nullable(),
  delete: z.boolean().optional(),
})

export const imageSchema = z.object({
  id: z.string(),
  caption: z.string(),
  data: z.instanceof(File),
  type: z.string(),
})

export const categoryViewSchema = z.object({
  id: z.string(),
  order: z.number(),
  caption: z.string(),
  description: z.string(),
  media: z.array(mediaSchema),
  altNames: z.array(altNameSchema),
})

export const categoryLocalSchema = categoryFieldsSchema
  .extend({
    activeImageId: z.string().nullable(),
    captionPosition: captionPositionEnum,
    characteristics: z.array(characteristicSchema),
    media: z.array(mediaSchema),
    images: z.array(imageSchema),
    altNames: z.array(altNameSchema),
    tags: z.array(tagSchema),
  })

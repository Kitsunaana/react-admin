import { z } from "zod"
import { categoryFieldsSchema } from "entities/category"
import { characteristicSchema } from "entities/characteristic"
import { altNameSchema } from "entities/alt-name"
import { tagSchema } from "entities/tag"
import {
  captionPositionEnum,
  categoryLocalSchema,
  categoryViewSchema,
  imageSchema,
  mediaSchema,
} from "./schemas"

export const postCategoryBodySchema = categoryLocalSchema

export const postCategoryResponseSchema = categoryViewSchema

export const patchCategoryBodySchema = categoryLocalSchema

export const patchCategoryResponseSchema = categoryViewSchema

export const getByIdCategorySchema = categoryFieldsSchema
  .extend({
    activeImageId: z.string().nullable(),
    captionPosition: captionPositionEnum,
    characteristics: z.array(characteristicSchema),
    media: z.array(mediaSchema),
    images: z.array(imageSchema),
    altNames: z.array(altNameSchema),
    tags: z.array(tagSchema),
    id: z.string(),
    order: z.number(),
  })

export const getAllCategoriesResponse = z.object({
  count: z.number().min(0),
  rows: z.array(categoryViewSchema),
})

export const patchChangeOrderResponse = z.array(z.number())

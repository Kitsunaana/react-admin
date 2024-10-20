/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * Good Api
 * Good Api
 * OpenAPI spec version: 1.0.0
 */
import { z as zod } from "zod"

export const getGoodsResponseItem = zod.object({
  id: zod.number(),
  caption: zod.string(),
  description: zod.string(),
  category: zod.object({
    id: zod.number(),
    description: zod.string(),
    caption: zod.string(),
    order: zod.number(),
  }),
})
export const getGoodsResponse = zod.array(getGoodsResponseItem)

/**
 * @summary Создание товара
 */
export const createGoodBody = zod.object({
  images: zod.array(
    zod.object({
      id: zod.string(),
      caption: zod.string(),
      data: zod.string(),
      type: zod.string(),
    }),
  ),
  article: zod.string(),
  caption: zod.string(),
  category: zod.object({
    id: zod.number(),
    description: zod.string(),
    caption: zod.string(),
    order: zod.number(),
  }),
  deliveryTime: zod.string(),
  description: zod.string(),
  isConsumable: zod.boolean(),
  isHot: zod.boolean(),
  isNew: zod.boolean(),
  label: zod.string(),
  notCalculation: zod.boolean(),
})

export const getGoodByIdParams = zod.object({
  goodId: zod.number(),
})

export const getGoodByIdResponse = zod.object({
  id: zod.number(),
  caption: zod.string(),
  description: zod.string(),
  category: zod.object({
    id: zod.number(),
    description: zod.string(),
    caption: zod.string(),
    order: zod.number(),
  }),
})

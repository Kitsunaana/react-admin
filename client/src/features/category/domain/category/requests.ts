import { Media } from "features/category"
import { AltName } from "entities/alt-name"
import { CategoryFields } from "entities/category"
import {
  CategoryOtherFields, CategoryRows,
  CategoryRowsWithoutImages,
} from "./types"

export type GetAllCategoriesResponse = {
  count: number
  rows: Array<{
    id: string
    order: number
    caption: string
    description: string
    media: Media[]
    altNames: AltName[]
  }>
}

export type GetByIdCategoryResponse = CategoryFields & CategoryRowsWithoutImages & CategoryOtherFields & {
  id: string
  order: number
}

export type CreateCategoryBody = CategoryFields & CategoryRows & CategoryOtherFields

export type CreateCategoryResponse = {
  id: string
  order: number
  caption: string
  description: string
  media: Media[]
  altNames: AltName[]
}

export type PatchCategoryBody = CategoryFields & CategoryRows & CategoryOtherFields & {
  id: string
}

export type PatchCategoryResponse = {
  id: string
  order: number
  caption: string
  description: string
  media: Media[]
  altNames: AltName[]
}

export type PatchChangeOrderBody = {
  id: string
  order: number
}

export type PatchChangeOrderResponse = number[]

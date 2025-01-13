import { Characteristic } from "entities/characteristic"
import { AltName } from "entities/alt-name"
import { Tag } from "entities/tag"
import { CategoryFields } from "entities/category"
import { Media, Image } from "../photo"

export type CaptionPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center-center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

export type CategoryOtherFields = {
  captionPosition: CaptionPosition
  activeImageId: null | string
}

export type CategoryRows = {
  media: Media[]
  images: Image[]
  characteristics: Characteristic[]
  altNames: AltName[]
  tags: Tag[]
}

export type CategoryRowsWithoutImages = {
  media: Media[]
  characteristics: Characteristic[]
  altNames: AltName[]
  tags: Tag[]
}

export type Category = CategoryFields & CategoryRowsWithoutImages & CategoryOtherFields & {
  id: string
  order: number
}

export type CategoryLocal = CategoryFields & CategoryRows & CategoryOtherFields

export type CategoryView = {
  id: string
  order: number
  caption: string
  description: string
  media: Media[]
  altNames: AltName[]
}

export const findCaption = (altNames: AltName[], defaultValue: string = ""): string => {
  const readLocale = localStorage.getItem("lngAdmin")

  const altName = altNames?.find((altName) => altName.locale.code === readLocale)

  return altName?.caption ?? defaultValue
}

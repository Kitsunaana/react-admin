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

export type Image = {
  id: string
  caption: string
  data: File
  type: string
}

export type Media = {
  filename: string;
  id: string;
  mimetype: string;
  originalName: string;
  path: string;
  size: number;
  order: number | null
  delete?: boolean
}

export type Locale = {
  id: string
  altName: string
  caption: string
  code: string
}

export type AltNameFields = {
  caption: string
  description: string
  locale: Locale
}

export type AltName = AltNameFields & {
  id: string
  status: "update" | "create" | "remove"
}

export type CharacteristicFields = {
  caption: string
  hideClient: boolean
  unit: string | null
  value: string
}

export type Characteristic = CharacteristicFields & {
  id: string
  status: "update" | "create" | "remove" | "none"
}

export type TagFields = {
  caption: string
  color: string
  icon: string | null
}

export type Tag = TagFields & {
  id: string
  status: "update" | "create" | "remove"
}

export type CategoryOtherFields = {
  captionPosition: CaptionPosition
  activeImageId: null | string
}

export type CategoryFields = {
  caption: string
  description: string
  isShowPhotoWithGoods: boolean
  bgColor: string
  color: string
  blur: number
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

export type GetAllCategoriesResponse = {
  rows: CategoryView[]
  count: number
}

export type GetByIdCategoryResponse = Category

export type CategoryWithImages = CategoryFields & CategoryRows & CategoryOtherFields & {
  id: string
  order: number
}

export type CategoryUpdated = Category

export type CategoryCreated = Category

export type CategoryCreatedWithImages = CategoryWithImages

export type CategoryUpdatedWithImages = CategoryWithImages

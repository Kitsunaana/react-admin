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

export type AltName = {
  caption: string
  description: string
  locale: Locale
  id: string
  status: "update" | "create" | "remove"
}

export type Characteristic = {
  caption: string
  hideClient: boolean
  unit: string | null
  value: string
  id: string
  status: "update" | "create" | "remove" | "none"
}

export type Tag = {
  id: string
  status: "update" | "create" | "remove"
  caption: string
  color: string
  icon: string | null
}

export type Category = {
  id: string
  order: number
  caption: string
  description: string
  isShowPhotoWithGoods: boolean
  bgColor: string
  color: string
  blur: number
  captionPosition: CaptionPosition
  activeImageId: null | string
  media: Media[]
  images: Image[]
  characteristics: Characteristic[]
  altNames: AltName[]
  tags: Tag[]
}

export type CategoryView = {
  id: string
  order: number
  caption: string
  description: string
  media: Media[]
  altNames: AltName[]
}

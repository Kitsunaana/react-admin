import { CategoryDto } from "shared/types/category"

export type TMedia = {
  id: string
  originalName: string
  path: string
  order: number | null
  /* filename: string
  mimetype: string
  size: number */

  data?: never
  type?: never
  caption?: never
}

export type TMediaForm = {
  deleted?: boolean
} & TMedia

export type TImage = {
  id: string
  caption: string
  data: File
  type: string

  path?: never
  originalName?: never
  order?: never
}
export type TPosition =
  "top-left" | "top-center" | "top-right" |
  "center-left" | "center-center" | "center-right" |
  "bottom-left" | "bottom-center" | "bottom-right"

export interface UseCategoryFormProps {
  caption: string;
  description: string | null;
  media?: CategoryDto.CategoryDto["media"]
  images?: TImage[]
  bgColor: string
  color: string
  blur: number
  captionPosition: TPosition
}

export interface ITab {
  id: number
  caption: string
  icon: string
  content?: string[]
}

export type TPositionCheckbox = {
  id: number
  content: string
  position: TPosition
}

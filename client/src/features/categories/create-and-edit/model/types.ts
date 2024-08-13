export type TMedia = {
  id: number
  path: string
  originalName: string
  order: number | null

  data?: never
  type?: never
  caption?: never
}

export type TMediaForm = {
  deleted?: boolean
} & TMedia

export type TImage = {
  caption: string
  data: File
  id: string
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
  description?: string;
  media: TMediaForm[]
  images: TImage[]
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

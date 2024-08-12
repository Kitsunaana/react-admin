export type TMedia = {
  id: number
  path: string
  originalName: string
  order: number | null
}

export type TMediaForm = {
  deleted?: boolean
} & TMedia

export type TImage = {
  caption: string
  data: File
  id: string
  type: string
}

export interface UseCategoryFormProps {
  caption: string;
  description: string;
  media?: TMediaForm[]
  images?: TImage[]
}

export interface ITab {
  id: number
  caption: string
  icon: string
  content?: string[]
}

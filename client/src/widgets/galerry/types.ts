export interface Image {
  id: string
  data: File
  caption: string

  filename?: never
  path?: never
}

export interface Media {
  filename: string
  id: number
  path: string

  data?: never
  caption?: never
}

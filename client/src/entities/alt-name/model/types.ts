export interface Locale {
  id: number
  caption: string
  altName: string
  code: string
}

export interface IAltNameAction {
  local?: boolean
  edited?: boolean
  action?: "create" | "update" | "remove"
}

export interface IAltName extends IAltNameAction {
  id: number | string
  caption: string
  description?: string | null
  locale: Locale
}

export interface IAltNameCreate {
  caption: string
  locale: Locale
  description?: string | null
}

export interface IAltNameEdit extends IAltNameCreate {
  id: string | number
}

interface ITranslate {
  trans: {
    caption: string
    description?: string | null
  }
}

export interface ICategoryTranslate {
  description: string | null
  caption: string
}

export type FetchTranslateData = Array<{ data: ITranslate, locale: Locale }>

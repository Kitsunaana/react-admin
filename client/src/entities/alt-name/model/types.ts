import { Common } from "shared/types/common"

export type Action = "update" | "create" | "remove"

export type AltName = Omit<Common.AltName, "id"> & {
  id: string | number
  action?: Action
}

export type AltNameCreate = Omit<Common.AltName, "id">

export type DataTranslation = Pick<Common.AltName, "description" | "caption">

interface ITranslate {
  trans: DataTranslation
}

export type FetchTranslateData = Array<{ data: ITranslate, locale: Common.Locale }>

import { Common } from "shared/types/common"

export type Action = "update" | "create" | "remove"

export type AltName = Omit<Common.AltName, "id"> & {
  id: string | number
  action?: Action
}

export type DataTranslation = Pick<Common.AltName, "description" | "caption">

export interface ITranslate {
  trans: DataTranslation
}

export type FetchTranslateResponse = { data: ITranslate, locale: Common.Locale }

export type FetchTranslateData = Array<FetchTranslateResponse>

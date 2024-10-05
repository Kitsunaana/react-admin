import { $axios } from "shared/config/axios"
import { Common } from "shared/types/common"
import { DataTranslation, FetchTranslateResponse } from "entities/alt-name/model/types"
import { validation } from "shared/lib/validation"
import { translateSchema } from "entities/alt-name/model/schemas"
import {
  KEY,
  HOST,
  URL_TRANSLATE,
  URL,
} from "../model/config"

const getData = (locale: Common.Locale, category: DataTranslation) => ({
  from: "auto",
  to: locale.code,
  json: {
    caption: category.caption,
    description: category.description,
  },
})

const getConfig = (host: string, key: string) => ({
  headers: {
    "Content-Type": "application/json",
    "x-rapidapi-host": host,
    "x-rapidapi-key": key,
  },
})

export const altNameApi = {
  getAll: async (): Promise<Common.Locale[]> => (
    $axios.get(URL).then(({ data }) => data)
  ),

  translate: async (
    locale: Common.Locale,
    category: DataTranslation,
  ): Promise<FetchTranslateResponse> => {
    try {
      const data = getData(locale, category)
      const config = getConfig(HOST, KEY)

      return $axios.post(URL_TRANSLATE, data, config)
        .then(({ data }) => ({
          data: validation(translateSchema, data),
          locale,
        }))
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
}

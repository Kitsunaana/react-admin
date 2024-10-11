import { $axios } from "shared/config/axios"
import { validation } from "shared/lib/validation"
import { Common } from "shared/types/common"
import {
  HOST,
  KEY,
  URL,
  URL_TRANSLATE,
} from "../model/config"
import { translateSchema } from "../model/schemas"
import { DataTranslation, FetchTranslateResponse } from "../model/types"

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
      const payload = getData(locale, category)
      const config = getConfig(HOST, KEY)

      const { data } = await $axios.post(URL_TRANSLATE, payload, config)

      return {
        data: validation(translateSchema, data),
        locale,
      }
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
}

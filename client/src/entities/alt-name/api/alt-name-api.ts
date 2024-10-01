import { $axios } from "shared/config/axios"
// import axios from "axios"
import { DataTranslation } from "entities/alt-name/model/alt-name-store"
import { Locale } from "../model/types"
import {
  KEY,
  HOST,
  URL_TRANSLATE,
  URL,
} from "../model/config"

const getData = (locale: Locale, category: DataTranslation) => ({
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
  getAll: async (): Promise<Locale[]> => $axios.get(URL).then(({ data }) => data),

  translate: async (locale: Locale, category: DataTranslation) => {
    try {
      const data = getData(locale, category)
      const config = getConfig(HOST, KEY)

      throw new Error("Fake error")
      // return $axios.post(URL_TRANSLATE, data, config)
      //   .then(({ data }) => ({ data, locale }))
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
}

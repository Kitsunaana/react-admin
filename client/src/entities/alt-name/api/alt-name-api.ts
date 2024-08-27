import { $axios } from "shared/config/axios"
import axios from "axios"
import { ICategoryTranslate, Locale } from "../model/types"
import {
  KEY, HOST, URL_TRANSLATE, URL,
} from "../model/config"

const createData = (locale: Locale, category: ICategoryTranslate) => ({
  from: "auto",
  to: locale.code,
  json: {
    caption: category.caption,
    description: category.description,
  },
})

const createConfig = (host: string, key: string) => ({
  headers: {
    "Content-Type": "application/json",
    "x-rapidapi-host": host,
    "x-rapidapi-key": key,
  },
})

export const altNameApi = {
  getAll: () => $axios.get(URL).then(({ data }) => data),

  translate: (locale: Locale, category: ICategoryTranslate) => {
    const data = createData(locale, category)
    const config = createConfig(HOST, KEY)

    return axios.post(URL_TRANSLATE, data, config)
      .then(({ data }) => ({ data, locale }))
  },
}

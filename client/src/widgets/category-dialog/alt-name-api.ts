import { $axios } from "shared/config/axios"
import { validation } from "shared/lib/validation"
import { Locale } from "shared/types/new_types/types"
import { translateSchema, FetchTranslateResponse, TranslateBody } from "./domain/alt-name"

export const URL = "/locales"
export const URL_TRANSLATE = "https://google-translate113.p.rapidapi.com/api/v1/translator/json"
export const HOST = "google-translate113.p.rapidapi.com"
export const KEY = "96f8c6e5a6msh97a27abce15673ap184725jsn5eb78c1312cd"

const getConfig = (host: string, key: string) => ({
  headers: {
    "Content-Type": "application/json",
    "x-rapidapi-host": host,
    "x-rapidapi-key": key,
  },
})

const getData = (
  locale: Locale,
  category: TranslateBody,
) => ({
  from: "auto",
  to: locale.code,
  json: {
    caption: category.caption,
    description: category.description,
  },
})

const translate = async (
  locale: Locale,
  category: TranslateBody,
): Promise<FetchTranslateResponse> => {
  const payload = getData(locale, category)
  const config = getConfig(HOST, KEY)

  const { data } = await $axios.post<{ trans: TranslateBody }>(URL_TRANSLATE, payload, config)

  return {
    data: validation(translateSchema, {
      trans: {
        ...data.trans,
        description: data.trans.description ?? "",
      },
    }),
    locale,
  }
}

export const altNameApi = {
  translate,
}

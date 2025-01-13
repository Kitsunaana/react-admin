import { z } from "zod"
import { Locale } from "entities/alt-name"

export type TranslateBody = {
  caption: string
  description: string
}

export type FetchTranslateResponse = {
  locale: Locale
  data: {
    trans: TranslateBody
  }
}

export const translateSchema = z.object({
  trans: z.object({
    caption: z.string(),
    description: z.string(),
  }),
})

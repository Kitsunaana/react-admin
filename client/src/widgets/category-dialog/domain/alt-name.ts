import { z } from "zod"

export type Locale = {
  id: string
  altName: string
  caption: string
  code: string
}

export type AltNameFields = {
  caption: string
  description: string
  locale: Locale
}

export type AltName = AltNameFields & {
  id: string
  status: "update" | "create" | "remove"
}

export type TranslateBody = {
  caption: string
  description: string
}

export type FetchTranslateResponse = {
  data: {
    trans: TranslateBody
  }
  locale: Locale
}

export const translateSchema = z.object({
  trans: z.object({
    caption: z.string(),
    description: z.string(),
  }),
})

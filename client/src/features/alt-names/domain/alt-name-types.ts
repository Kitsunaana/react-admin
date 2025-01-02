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

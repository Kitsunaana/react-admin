export type TagFields = {
  caption: string
  color: string
  icon: string | null
}

export type Tag = TagFields & {
  id: string
  status: "update" | "create" | "remove" | "none"
}

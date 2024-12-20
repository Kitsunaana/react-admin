export type CharacteristicFields = {
  caption: string
  unit: string | null
  value: string
  hideClient: boolean
}

export type Characteristic = CharacteristicFields & {
  id: string
  status: "create" | "update" | "remove" | "none"
}

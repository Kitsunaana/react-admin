export type CharacteristicFields = {
  caption: string
  hideClient: boolean
  unit: string | null
  value: string
}

export type Characteristic = CharacteristicFields & {
  id: string
  status: "update" | "create" | "remove" | "none"
}

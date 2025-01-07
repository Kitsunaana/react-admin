export type CharacteristicResponse = {
  id: string
  caption: string
}

export type CharacteristicsResponse = Array<CharacteristicResponse>

export type UnitResponse = {
  id: string
  caption: string | null
}

export type UnitsResponse = Array<UnitResponse>

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

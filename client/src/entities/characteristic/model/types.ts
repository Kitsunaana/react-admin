export interface ICharacteristic {
  id: number | string
  unit: string | null
  caption: string
  value: string
  hideClient: boolean

  local?: boolean
  action?: "update" | "create" | "remove"
}

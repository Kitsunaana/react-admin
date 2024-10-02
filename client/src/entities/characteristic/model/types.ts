export interface ICharacteristic {
  id: number | string
  unit: string | null
  characteristic: string
  value: string
  hideClient: boolean

  local?: boolean
  action?: "update" | "create" | "remove"
}

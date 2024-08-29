export interface ICharacteristic{
  id: string | number
  caption: string
  unit: string | null
  value: string
  hideClient: boolean

  local?: boolean
  deleted?: boolean
  action?: "update" | "create"
}

export interface UseCharacteristicsFormProps extends Omit<ICharacteristic, "id" | "caption">{
  caption: string | null
}

import { Common } from "shared/types/common"
import { Action } from "./types"

export interface CharacteristicsStoreImpl {
  characteristics: Array<Common.CharacteristicCreate | Common.Characteristic>
  get filteredItems(): Array<Common.CharacteristicCreate | Common.Characteristic>
  create: (payload: Common.CharacteristicBase & { id: string }) => void
  edit: (payload: Common.CharacteristicCreate) => void
  remove: (id: string | number) => void
  isCreatedOrUpdated: (id: number | string) => boolean
  getConflict: (data: Pick<Common.CharacteristicCreate, "caption" | "id">) => boolean
  getData: () => {
    characteristics: Array<Common.CharacteristicCreate | Common.Characteristic>
  }
  applyActions: (characteristics: Array<Common.CharacteristicBase>) => (
    {
      add: () => void[],
      replace: () => void,
      none: () => void
    }
  )
  setCopiedCharacteristics: (action: Action, characteristics: Array<Common.CharacteristicBase>) => void
  setCharacteristics: (characteristics: Array<Common.Characteristic | Common.CharacteristicCreate>) => void
}

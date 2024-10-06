import { DeepPartial } from "react-hook-form"
import { Common } from "shared/types/common"

export const defaultValues: DeepPartial<Common.CharacteristicBase> = {
  caption: "",
  unit: null,
  value: "",
  hideClient: true,
}

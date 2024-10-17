import { createRoute } from "shared/lib/event-bus"
import { Common } from "shared/types/common"

export const openCreateCharacteristicDialog = createRoute("openCreateCharacteristicDialog")
  .withParams()

export const openEditCharacteristicDialog = createRoute("openEditCharacteristicDialog")
  .withParams<Common.CharacteristicCreate>()

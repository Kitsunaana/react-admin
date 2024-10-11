import { createRoute } from "shared/lib/event-bus"
import { Common } from "shared/types/common"

export const openCreateAltNameDialog = createRoute("openCreateAltNameDialog")
  .withParams()

export const openEditAltNameDialog = createRoute("openEditAltNameDialog")
  .withParams<Common.AltNameCreate>()
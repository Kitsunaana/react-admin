import { createRoute } from "shared/lib/event-bus"
import { AltName } from "shared/types/new_types/types"

export const openCreateAltNameDialog = createRoute("openCreateAltNameDialog")
  .withParams()

export const openEditAltNameDialog = createRoute("openEditAltNameDialog")
  .withParams<AltName>()

import { useCallback } from "react"
import { AltName } from "shared/types/new_types/types"
import { createRoute, eventBus } from "shared/lib/event-bus"
import { useAltNameStore } from "../model/use-alt-name-store"

const openModalEvent = createRoute("altName.edit.open")
  .withParams<{ payload: AltName, altNames: AltName[] }>()

export const useAltNames = () => {
  const altNames = useAltNameStore((store) => store.altNames)
  const remove = useAltNameStore((store) => store.remove)

  const onEdit = useCallback((payload: AltName) => (
    eventBus.emit(openModalEvent({ payload, altNames }))
  ), [altNames])

  return altNames.map((item) => ({
    data: item,
    edit: onEdit,
    remove,
  }))
}

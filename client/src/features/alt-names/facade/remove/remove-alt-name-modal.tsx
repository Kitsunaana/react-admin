import { useEvent } from "shared/hooks/use-event"
import { useStartRemove } from "./use-start-remove"
import { removeAltName, openRemoveAltNameModalEvent } from "../../domain/alt-names-events"

export const RemoveAltNameModal = () => {
  const startRemove = useStartRemove()

  useEvent(openRemoveAltNameModalEvent, ({ payload }) => startRemove(payload, removeAltName))

  return null
}

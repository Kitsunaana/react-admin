import { useEvent } from "shared/hooks/use-event"
import { useStartRemove } from "./use-start-remove"
import { removeAltName, openModalRemoveAltNameEvent } from "../../domain/events"

export const RemoveModal = () => {
  const startRemove = useStartRemove()

  useEvent(openModalRemoveAltNameEvent, ({ payload }) => startRemove(payload, removeAltName))

  return null
}

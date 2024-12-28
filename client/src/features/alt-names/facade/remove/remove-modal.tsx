import { createRoute } from "shared/lib/event-bus"
import { useEvent } from "shared/hooks/use-event"
import { useStartRemove } from "./use-start-remove"
import { AltName } from "../../domain/types"

const altNameRemoveEvent = createRoute("altName.remove.submit")
  .withParams<{ data: AltName, callback:(id: string) => void }>()

export const RemoveModal = () => {
  const startRemove = useStartRemove()

  useEvent(altNameRemoveEvent, ({ payload }) => {
    startRemove(payload.data, payload.callback)
  })

  return null
}

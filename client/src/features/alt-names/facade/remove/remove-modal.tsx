import { createRoute } from "shared/lib/event-bus"
import { useEventBusListen } from "shared/hooks/use-event-bus-listen"
import { useStartRemove } from "./use-start-remove"
import { AltName } from "../../domain/types"

const altNameRemoveEvent = createRoute("altName.remove.submit")
  .withParams<{ data: AltName, callback:(id: string) => void }>()

export const RemoveModal = () => {
  const startRemove = useStartRemove()

  useEventBusListen(altNameRemoveEvent, ({ payload }) => {
    startRemove(payload.data, payload.callback)
  })

  return null
}

import { createRoute } from "shared/lib/event-bus"
import { useEventBusListen } from "shared/hooks/use-event-bus-listen"
import { useStartRemove } from "./use-start-remove"
import { Characteristic } from "../../domain/types"

export const characteristicRemoveEvent = createRoute("characteristic.remove.submit")
  .withParams<{ data: Characteristic, callback:(id: string) => void }>()

export const RemoveModal = () => {
  const startRemove = useStartRemove()

  useEventBusListen(characteristicRemoveEvent, ({ payload }) => {
    startRemove(payload.data, payload.callback)
  })

  return null
}

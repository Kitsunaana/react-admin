import { eventBus } from "shared/lib/event-bus"
import { useEvent } from "shared/hooks/use-event"
import { useStartRemove } from "./use-start-remove"
import { openModalRemoveTagEvent, submitRemoveTagEvent } from "../../domain/events"

export const RemoveModal = () => {
  const startRemove = useStartRemove()

  useEvent(openModalRemoveTagEvent, ({ payload }) => {
    startRemove(payload, (id) => eventBus.emit(submitRemoveTagEvent(id)))
  })

  return null
}

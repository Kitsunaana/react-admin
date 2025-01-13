import { useEvent } from "shared/hooks/use-event"
import { eventBus } from "shared/lib/event-bus"
import {
  openModalRemoveCharacteristicEvent,
  submitRemoveCharacteristicEvent,
} from "../../domain/events"
import { useStartRemove } from "./use-start-remove"

export const RemoveModal = () => {
  const startRemove = useStartRemove()

  useEvent(openModalRemoveCharacteristicEvent, ({ payload }) => {
    startRemove(payload, (id) => {
      eventBus.emit(submitRemoveCharacteristicEvent(id))
    })
  })

  return null
}

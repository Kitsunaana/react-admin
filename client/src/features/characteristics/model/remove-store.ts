import { eventBus } from "shared/lib/event-bus"
import { Characteristic } from "../domain/types"
import { openRemoveModalEvent, submitRemoveEvent } from "../domain/events"

export class RemoveStore {
  constructor(
    private getRemoveModal: (
      data: Characteristic,
      callback: (id: string) => void
    ) => Promise<void>,
  ) {
    eventBus.on(openRemoveModalEvent, ({ payload }) => {
      this.getRemoveModal(payload, (id) => (
        eventBus.emit(submitRemoveEvent({ id }))
      ))
    })
  }
}

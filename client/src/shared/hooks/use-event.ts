import { useEffect } from "react"
import { eventBus, EventCreator, EventType } from "shared/lib/event-bus"

export const useEvent = <K extends string, V>(
  eventCreator: EventCreator<K, V>,
  event: (event: EventType<K, V>) => void,
) => {
  useEffect(() => {
    eventBus.on(eventCreator, event)

    return () => eventBus.off(eventCreator, event)
  }, [])
}

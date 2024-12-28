import { createRoute } from "shared/lib/event-bus"
import { useEvent } from "shared/hooks/use-event"
import { useStartRemove } from "./use-start-remove"
import { Tag } from "../../domain/types"

const tagRemoveEvent = createRoute("tag.remove.submit")
  .withParams<{ data: Tag, callback:(id: string) => void }>()

export const RemoveModal = () => {
  const startRemove = useStartRemove()

  useEvent(tagRemoveEvent, ({ payload }) => {
    startRemove(payload.data, payload.callback)
  })

  return null
}

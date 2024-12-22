import { useCallback } from "react"
import { createRoute, eventBus } from "shared/lib/event-bus"
import { Tag } from "shared/types/new_types/types"
import { useTagsStore } from "../model/use-tags-store"

const openModalEvent = createRoute("tag.edit.open")
  .withParams<Tag>()

export const useTags = () => {
  const tags = useTagsStore((store) => store.tags)
  const remove = useTagsStore((store) => store.remove)

  const edit = useCallback((payload: Tag) => eventBus.emit(openModalEvent(payload)), [])

  return tags.map((item) => ({
    data: item,
    isCreatedOrUpdated: item.status === "create" || item.status === "update",
    remove,
    edit,
  }))
}

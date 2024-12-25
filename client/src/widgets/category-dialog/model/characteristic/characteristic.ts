import { createRoute, eventBus } from "shared/lib/event-bus"
import { Characteristic } from "shared/types/new_types/types"

export const characteristicCreateEvent = createRoute("characteristic.create.submit")
  .withParams<Characteristic>()

export const characteristicEditEvent = createRoute("characteristic.edit.submit")
  .withParams<Characteristic>()

export const characteristicRemoveEvent = createRoute("characteristic.remove.submit")
  .withParams<{ data: Characteristic, callback:(id: string) => void }>()

const openEditModalEvent = createRoute("characteristic.edit.open")
  .withParams<Characteristic>()

const openCreateModal = createRoute("characteristic.create.open")

export const openEditCharacteristicModal = (payload: Characteristic) => (
  eventBus.emit(openEditModalEvent(payload))
)

export const openCreateCharacteristicModal = () => eventBus.emit(openCreateModal())

const getItemsCaption = (items: Characteristic[]) => items.map((item) => item.caption)

export const getFilteredItems = (items: Characteristic[], exclude: Characteristic[]) => {
  const captionItems = getItemsCaption(items)

  return exclude.filter((item) => !captionItems.includes(item.caption))
}

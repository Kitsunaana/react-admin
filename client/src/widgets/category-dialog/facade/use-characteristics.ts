import { useCharacteristicStore } from "widgets/category-dialog/model/characteristic/use-characteristic-store"
import { openEditCharacteristicModal } from "widgets/category-dialog/model/characteristic/characteristic"

export const useCharacteristics = () => {
  const isAlreadyExists = useCharacteristicStore((store) => store.isAlreadyExists)
  const isCreatedOrUpdated = useCharacteristicStore((store) => store.isCreatedOrUpdated)

  const characteristics = useCharacteristicStore((store) => store.array)
  const remove = useCharacteristicStore((store) => store.delete)

  return characteristics.map((item) => ({
    data: item,
    hasConflict: isAlreadyExists(item),
    isCreatedOrUpdated: isCreatedOrUpdated(item),
    edit: openEditCharacteristicModal,
    remove,
  }))
}

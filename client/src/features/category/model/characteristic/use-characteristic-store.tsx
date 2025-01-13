import { useCategoryStore } from "../../model/category/use-category-store"
import { CharacteristicStore } from "./characteristic-store"

export const useCharacteristicStore = <T = CharacteristicStore, >(
  getState?: (store: CharacteristicStore) => T,
): T => {
  const store = useCategoryStore((store) => store.characteristic)

  if (getState) return getState(store)
  return store as T
}

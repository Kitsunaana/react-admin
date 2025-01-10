import { AltNameStore } from "./alt-name.store"
import { useCategoryStore } from "../category/use-category-store"

export const useAltNameStore = <T = AltNameStore>(getState?: (store: AltNameStore) => T): T => {
  const store = useCategoryStore((store) => store.altNames)

  if (getState) return getState(store)
  return store as T
}

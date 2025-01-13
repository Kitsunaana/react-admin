import { TagStore } from "./tag-store"
import { useCategoryStore } from "../category/use-category-store"

export const useTagStore = <T = TagStore>(getState?: (store: TagStore) => T): T => {
  const store = useCategoryStore((store) => store.tags)

  if (getState) return getState(store)
  return store as T
}

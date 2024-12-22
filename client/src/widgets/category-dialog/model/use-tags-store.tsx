import { TagsStore } from "../store/tags-store"
import { useCategoryStore } from "./use-category-store"

export const useTagsStore = <T = TagsStore, >(
  getState?: (store: TagsStore) => T,
): T => {
  const store = useCategoryStore((store) => store.tags)

  if (getState) return getState(store)
  return store as T
}

import { HistoryStore } from "./history-store"
import { useCategoryStore } from "../category/use-category-store"

export const useHistoryStore = <T = HistoryStore, >(getState?: (store: HistoryStore) => T): T => {
  const store = useCategoryStore((store) => store.history)

  if (getState) return getState(store)
  return store as T
}

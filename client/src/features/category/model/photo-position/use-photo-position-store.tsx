import { useCategoryStore } from "../category/use-category-store"
import { PhotoPositionStore } from "./photo-position.store"

export const usePhotoPositionStore = <T = PhotoPositionStore, >(
  getState?: (store: PhotoPositionStore) => T,
): T => {
  const store = useCategoryStore((store) => store.photoPosition)

  if (getState) return getState(store)
  return store as T
}

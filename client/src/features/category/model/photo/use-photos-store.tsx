import { PhotosStore } from "./photos.store"
import { useCategoryStore } from "../category/use-category-store"

export const usePhotosStore = <T = PhotosStore>(getState?: (store: PhotosStore) => T): T => {
  const store = useCategoryStore((store) => store.photos)

  if (getState) return getState(store)
  return store as T
}

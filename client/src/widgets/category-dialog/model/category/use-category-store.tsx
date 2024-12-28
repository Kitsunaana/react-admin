import { createContext, ReactNode, useState } from "react"
import { useStrictContext } from "shared/lib/react"
import { Characteristic, Tag } from "shared/types/new_types/types"
import { CharacteristicStore } from "widgets/category-dialog/model/characteristic/characteristic-store"
import { TagStore } from "widgets/category-dialog/model/tag/tag-store"
import { CategoryStore } from "./category-store"
import { AltNameStore } from "../alt-names/alt-name.store"
import { HistoryStore } from "../history/history-store"
import { PhotoPositionStore } from "../photo-position/photo-position.store"
import { PhotosStore } from "../photos/photos.store"
import { List } from "../list"

export const CategoryStoreContext = createContext<CategoryStore | null>(null)

export const useCategoryStore = <T = CategoryStore, >(getState?: (store: CategoryStore) => T): T => {
  const store = useStrictContext(CategoryStoreContext)

  if (getState) return getState(store)
  return store as T
}

export const CategoryStoreProvider = ({ children }: { children: ReactNode }) => {
  const [store] = useState(() => new CategoryStore({
    getHistory: () => new HistoryStore(),
    getPhotos: (recordEvent) => new PhotosStore(recordEvent),
    getPhotoPosition: (recordEvent) => new PhotoPositionStore(recordEvent),
    getCharacteristics: (recordEvent) => (
      new CharacteristicStore(recordEvent, new List<Characteristic>([]))
    ),
    getAltNames: (parent) => new AltNameStore(parent),
    getTags: (recordEvent) => new TagStore(recordEvent, new List<Tag>([])),
  }))

  return (
    <CategoryStoreContext.Provider value={store}>
      {children}
    </CategoryStoreContext.Provider>
  )
}

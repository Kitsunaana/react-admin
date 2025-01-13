import { createContext, ReactNode, useState } from "react"
import { useStrictContext } from "shared/lib/react"
import { Characteristic } from "entities/characteristic"
import { AltName } from "entities/alt-name"
import { Tag } from "entities/tag"
import { CharacteristicStore } from "../characteristic/characteristic-store"
import { TagStore } from "../tag/tag-store"
import { AltNameStore } from "../alt-name/alt-name.store"
import { PhotosStore } from "../photo/photos.store"
import { HistoryStore } from "../../view-model/history/history-store"
import { CategoryStore } from "./category-store"
import { PhotoPositionStore } from "../photo-position/photo-position.store"
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
    getCharacteristics: (recordEvent) => (new CharacteristicStore(recordEvent, new List<Characteristic>([]))),
    getAltNames: (recordEvent) => new AltNameStore(recordEvent, new List<AltName>([])),
    getTags: (recordEvent) => new TagStore(recordEvent, new List<Tag>([])),
  }))

  return (
    <CategoryStoreContext.Provider value={store}>
      {children}
    </CategoryStoreContext.Provider>
  )
}

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react"
import { CategoryDto } from "shared/types/category"
import { Common } from "shared/types/common"
import { Action } from "features/categories/dialog/domain/types"
import { createRootStore, RootCategoryStores } from "../model/category-dialog.store"

const RootStoreContext = createContext(createRootStore())
export const useCategoryStores = () => useContext(RootStoreContext)

type Tag = CategoryDto.TagCreate | CategoryDto.Tag

interface TagsStore {
  new(setting: () => Action): TagsStore
  getData: () => {
    tags: Tag[]
  }
  setTags: (tags: Tag[]) => void
  setCopiedTags: (copiedTags: Tag[]) => void
}

interface PhotosStore {
  new(setting: () => Action): PhotosStore
  getData: () => {
    images: Common.Image[],
    media: (Common.Media | Common.MediaCreate)[]
  }
  setImages: (images: Common.Image[]) => void
  setMedia: (media: (Common.Media | Common.MediaCreate)[]) => void
  setCopiedMedia: (payload: {
    images: Common.Image[],
    media: (Common.Media | Common.MediaCreate)[]
  }) => void
}

interface AltNameStore {
  // new(): AltNameStore
  getData: () => {
    altNames: (Common.AltNameCreate | Common.AltName)[]
  }
  setAltNames: (altNames: (Common.AltName | Common.AltNameCreate)[]) => void
}

interface PhotoPositionStore {
  new(photos: PhotosStore): PhotoPositionStore
  getData: () => {
    captionPosition: CategoryDto.CategoryDto["captionPosition"]
    activeImageId: CategoryDto.CategoryDto["activeImageId"]
  }
  setPhotoPosition: (payload: {
    captionPosition: CategoryDto.CategoryDto["captionPosition"]
    activeImageId: CategoryDto.CategoryDto["activeImageId"]
  }) => void
}

interface CharacteristicsStore {
  new(setting: () => Action): CharacteristicsStore
  getData: () => {
    characteristics: (Common.Characteristic | Common.CharacteristicCreate)[]
  }
  setCharacteristics: (characteristics: (Common.Characteristic | Common.CharacteristicCreate)[]) => void
  setCopiedCharacteristics: (copiedCharacteristics: Common.CharacteristicBase[]) => void
}

interface HistoryStore {
  new(): HistoryStore
}

export interface CategoryStoreProviderProps {
  TagsStore: TagsStore
  PhotosStore: PhotosStore
  AltNameStore: AltNameStore
  PhotoPositionStore: PhotoPositionStore
  CharacteristicsStore: CharacteristicsStore
  HistoryStore: HistoryStore
}

export const CategoryStoreProvider: FC<CategoryStoreProviderProps> = (props) => {
  const {
    children,
    TagsStore,
    PhotosStore,
    HistoryStore,
    AltNameStore,
    PhotoPositionStore,
    CharacteristicsStore,
  } = props

  const [state] = useState(() => new RootCategoryStores(
    {
      TagsStore,
      PhotosStore,
      HistoryStore,
      AltNameStore,
      PhotoPositionStore,
      CharacteristicsStore,
    },
  ))

  return (
    <RootStoreContext.Provider value={state}>
      {children}
    </RootStoreContext.Provider>
  )
}

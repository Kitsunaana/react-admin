import { ReactNode, useState } from "react"
import { createStrictContext, useStrictContext } from "shared/lib/react"
import { AltNamesStoreImpl } from "entities/alt-name/domain/interface.store"
import { PhotoPositionStoreImpl, PhotosStoreImpl } from "features/categories/dialog"
import { TagsStoreImpl } from "entities/tag/domain/tags.store"
import { CharacteristicsStoreImpl } from "entities/characteristic/domain/interface.store"
import { HistoryStoreImpl } from "features/categories/history/domain/interface-history.store"
import { RootCategoryStores } from "../model/category-dialog.store"

const RootStoreContext = createStrictContext<RootCategoryStores>()
export const useCategoryStores = () => useStrictContext(RootStoreContext)

export interface CategoryStores {
  TagsStore: new() => TagsStoreImpl
  PhotosStore: new() => PhotosStoreImpl
  AltNamesStore: new() => AltNamesStoreImpl
  PhotoPositionStore: new(photos: PhotosStoreImpl) => PhotoPositionStoreImpl
  CharacteristicsStore: new() => CharacteristicsStoreImpl
  HistoryStore: new() => HistoryStoreImpl
}

export interface CategoryStoreProviderProps {
  stores: CategoryStores
  children: ReactNode
}

export const CategoryStoreProvider = (props: CategoryStoreProviderProps) => {
  const {
    children,
    stores,
  } = props

  const [state] = useState(() => new RootCategoryStores(stores))

  return (
    <RootStoreContext.Provider value={state}>
      {children}
    </RootStoreContext.Provider>
  )
}

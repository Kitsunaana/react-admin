import {
  createContext, FC, PropsWithChildren, useContext, useState,
} from "react"
import * as React from "react"
import { createRootStore } from "features/goods/dialog/model/stores/dialog-store"

const RootStoreContext = createContext(createRootStore())
export const useStores = () => useContext(RootStoreContext)

export const StoreProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props

  const [state] = useState(createRootStore)

  return (
    <RootStoreContext.Provider value={state}>
      {children}
    </RootStoreContext.Provider>
  )
}

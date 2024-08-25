import { createDialogStore, DialogStore } from "shared/ui/dialog/model/dialog-store"
import {
  createContext, FC, PropsWithChildren, useContext, useState,
} from "react"
import * as React from "react"

const RootDeleteDialogStoreContext = createContext(createDialogStore())
export const useDeleteDialogStore = () => useContext(RootDeleteDialogStoreContext)

export const StoreDeleteDialogProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props

  const [store] = useState(createDialogStore)

  return (
    <RootDeleteDialogStoreContext.Provider value={store}>
      {children}
    </RootDeleteDialogStoreContext.Provider>
  )
}

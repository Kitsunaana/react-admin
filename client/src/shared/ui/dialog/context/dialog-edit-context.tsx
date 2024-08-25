import { createDialogStore, DialogStore } from "shared/ui/dialog/model/dialog-store"
import {
  createContext, FC, PropsWithChildren, useContext, useState,
} from "react"
import * as React from "react"

const RootEditDialogStoreContext = createContext(createDialogStore())
export const useEditDialogStore = () => useContext(RootEditDialogStoreContext)

export const StoreEditDialogProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props

  const [state] = useState(createDialogStore)

  return (
    <RootEditDialogStoreContext.Provider value={state}>
      {children}
    </RootEditDialogStoreContext.Provider>
  )
}

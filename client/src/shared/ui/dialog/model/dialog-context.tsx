import {
  Context, createContext, FC, PropsWithChildren, useContext, useState,
} from "react"
import * as React from "react"
import { createDialogStore, DialogStore } from "shared/ui/dialog/model/dialog-store"

export const useStrictContext = <T, >(context: Context<T | null>) => {
  const value = useContext(context)
  if (value === null) throw new Error("Strict context not passed")

  return value as T
}

export const createStrictContext = <T, >() => createContext<T | null>(null)

const RootDialogStoreContext = createStrictContext<DialogStore>()

export const useDialogStore = () => useStrictContext(RootDialogStoreContext)

export const StoreDialogProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props

  const [state] = useState(createDialogStore)

  return (
    <RootDialogStoreContext.Provider value={state}>
      {children}
    </RootDialogStoreContext.Provider>
  )
}

const RootDeleteDialogStoreContext = createStrictContext<DialogStore>()

export const useDeleteDialogStore = () => useStrictContext(RootDeleteDialogStoreContext)

export const StoreDeleteDialogProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props

  const [store] = useState(createDialogStore)

  return (
    <RootDeleteDialogStoreContext.Provider value={store}>
      {children}
    </RootDeleteDialogStoreContext.Provider>
  )
}

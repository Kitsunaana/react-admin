import { createDialogStore } from "shared/stores/dialog-store"
import {
  FC,
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react"

const RootEditDialogStoreContext = createContext(createDialogStore())
export const useEditDialogStore = () => useContext(RootEditDialogStoreContext)

export const StoreEditDialogProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state] = useState(createDialogStore)

  return (
    <RootEditDialogStoreContext.Provider value={state}>
      {children}
    </RootEditDialogStoreContext.Provider>
  )
}

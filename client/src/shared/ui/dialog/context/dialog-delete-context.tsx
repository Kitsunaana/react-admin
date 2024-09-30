import { createDialogStore } from "shared/ui/dialog/model/dialog-store"
import {
  FC,
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react"

const RootDeleteDialogStoreContext = createContext(createDialogStore())
export const useDeleteDialogStore = () => useContext(RootDeleteDialogStoreContext)

export const StoreDeleteDialogProvider: FC<PropsWithChildren> = ({ children }) => {
  const [store] = useState(createDialogStore)

  return (
    <RootDeleteDialogStoreContext.Provider value={store}>
      {children}
    </RootDeleteDialogStoreContext.Provider>
  )
}

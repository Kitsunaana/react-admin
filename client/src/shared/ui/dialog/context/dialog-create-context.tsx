import { createDialogStore } from "shared/ui/dialog/model/dialog-store"
import {
  FC,
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react"

const RootCreateDialogStoreContext = createContext(createDialogStore())
export const useCreateDialogStore = () => useContext(RootCreateDialogStoreContext)

export const StoreCreateDialogProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state] = useState(createDialogStore)

  return (
    <RootCreateDialogStoreContext.Provider value={state}>
      {children}
    </RootCreateDialogStoreContext.Provider>
  )
}

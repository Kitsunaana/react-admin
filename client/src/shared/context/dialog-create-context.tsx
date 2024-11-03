import {
  createContext,
  FC,
  PropsWithChildren,
  useState,
} from "react"
import { useStrictContext } from "shared/lib/react"
import { DialogStore } from "shared/stores/dialog-store"

const RootCreateDialogStoreContext = createContext<DialogStore | null>(null)
export const useCreateDialogStore = () => useStrictContext(RootCreateDialogStoreContext)

export const StoreCreateDialogProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state] = useState(new DialogStore())

  return (
    <RootCreateDialogStoreContext.Provider value={state}>
      {children}
    </RootCreateDialogStoreContext.Provider>
  )
}

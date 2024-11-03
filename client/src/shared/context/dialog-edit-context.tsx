import {
  createContext,
  FC,
  PropsWithChildren,
  useState,
} from "react"
import { useStrictContext } from "shared/lib/react"
import { DialogStore } from "shared/stores/dialog-store"

const RootEditDialogStoreContext = createContext<DialogStore | null>(null)
export const useEditDialogStore = () => useStrictContext(RootEditDialogStoreContext)

export const StoreEditDialogProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state] = useState(() => new DialogStore())

  return (
    <RootEditDialogStoreContext.Provider value={state}>
      {children}
    </RootEditDialogStoreContext.Provider>
  )
}

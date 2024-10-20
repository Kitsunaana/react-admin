import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react"
import { createRootStore } from "./stores/dialog-store"

const RootStoreContext = createContext(createRootStore())
export const useCategoryStores = () => useContext(RootStoreContext)

export const CategoryStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state] = useState(createRootStore)

  return (
    <RootStoreContext.Provider value={state}>
      {children}
    </RootStoreContext.Provider>
  )
}

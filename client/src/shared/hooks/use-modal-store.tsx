import {
  createContext, ReactNode, useState,
} from "react"
import { useStrictContext } from "shared/lib/react"
import { ModalStore } from "shared/stores/modal-store"

const RootModalStoreContext = createContext<ModalStore | null>(null)

export const useModalStore = <T = ModalStore, >(getState?: (store: ModalStore) => T): T => {
  const store = useStrictContext(RootModalStoreContext)

  if (getState) return getState(store)
  return store as T
}

export const ModalStoreProvider = ({ children }: { children: ReactNode }) => {
  const [state] = useState(new ModalStore())

  return (
    <RootModalStoreContext.Provider value={state}>
      {children}
    </RootModalStoreContext.Provider>
  )
}

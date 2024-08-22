import { createDialogStore, DialogStore } from "shared/ui/dialog/model/dialog-store"
import { FC, PropsWithChildren, useState } from "react"
import * as React from "react"
import { createStrictContext, useStrictContext } from "shared/lib/react"

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

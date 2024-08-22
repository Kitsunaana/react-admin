import { createDialogStore, DialogStore } from "shared/ui/dialog/model/dialog-store"
import { FC, PropsWithChildren, useState } from "react"
import * as React from "react"
import { createStrictContext, useStrictContext } from "shared/lib/react"

const RootEditDialogStoreContext = createStrictContext<DialogStore>()

export const useEditDialogStore = () => useStrictContext(RootEditDialogStoreContext)

export const StoreEditDialogProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props

  const [state] = useState(createDialogStore)

  return (
    <RootEditDialogStoreContext.Provider value={state}>
      {children}
    </RootEditDialogStoreContext.Provider>
  )
}

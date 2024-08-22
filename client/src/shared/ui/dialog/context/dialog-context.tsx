import { FC, PropsWithChildren } from "react"
import * as React from "react"
import { StoreEditDialogProvider } from "shared/ui/dialog/context/dialog-edit-context"
import { StoreDeleteDialogProvider } from "shared/ui/dialog/context/dialog-delete-context"

export const RootDialogProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props

  return (
    <StoreEditDialogProvider>
      <StoreDeleteDialogProvider>
        {children}
      </StoreDeleteDialogProvider>
    </StoreEditDialogProvider>
  )
}

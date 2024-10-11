import { FC, PropsWithChildren } from "react"
import { StoreEditDialogProvider } from "shared/context/dialog-edit-context"
import { StoreCreateDialogProvider } from "shared/context/dialog-create-context"

export const RootDialogProvider: FC<PropsWithChildren> = ({ children }) => (
  <StoreEditDialogProvider>
    <StoreCreateDialogProvider>
      {children}
    </StoreCreateDialogProvider>
  </StoreEditDialogProvider>
)

import { FC, PropsWithChildren } from "react"
import { StoreEditDialogProvider } from "shared/ui/dialog/context/dialog-edit-context"
import { StoreDeleteDialogProvider } from "shared/ui/dialog/context/dialog-delete-context"
import { StoreCreateDialogProvider } from "shared/ui/dialog/context/dialog-create-context"

export const RootDialogProvider: FC<PropsWithChildren> = ({ children }) => (
  <StoreEditDialogProvider>
    <StoreCreateDialogProvider>
      <StoreDeleteDialogProvider>
        {children}
      </StoreDeleteDialogProvider>
    </StoreCreateDialogProvider>
  </StoreEditDialogProvider>
)

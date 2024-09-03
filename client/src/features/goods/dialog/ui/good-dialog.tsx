import { GoodEditDialog } from "features/goods/dialog/ui/good-edit-dialog"
import { StoreProvider } from "features/goods/dialog/model/context"

export const GoodDialog = () => (
  <StoreProvider>
    <GoodEditDialog />
  </StoreProvider>
)

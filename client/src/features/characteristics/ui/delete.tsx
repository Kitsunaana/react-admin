import { DialogDelete as DialogDeleteBase } from "shared/ui/dialog/dialog-delete"
import { StoreDialogProvider } from "shared/ui/dialog/dialog-edit"
import { useStores } from "features/categories/create-and-edit/ui/dialog"

export const DialogDelete = () => {
  const { characteristics } = useStores()

  return (
    <StoreDialogProvider>
      <DialogDeleteBase
        langBase="characteristics"
        onDeleteLocal={characteristics.remove}
      />
    </StoreDialogProvider>
  )
}

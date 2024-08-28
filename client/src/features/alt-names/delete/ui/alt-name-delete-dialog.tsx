import { DialogDelete as DialogDeleteBase } from "shared/ui/dialog/dialog-delete"
import { useStores } from "features/categories/create-and-edit/model/context"

export const AltNameDeleteDialog = () => {
  const { altNames } = useStores()

  return (
    <DialogDeleteBase
      langBase="altNames"
      onDeleteLocal={altNames.remove}
    />
  )
}

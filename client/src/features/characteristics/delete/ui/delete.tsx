import { DialogDelete as DialogDeleteBase } from "shared/ui/dialog/dialog-delete"
import { useStores } from "features/categories/create-and-edit/model/context"

export const DialogDelete = () => {
  const { characteristics } = useStores()

  return (
    <DialogDeleteBase
      langBase="characteristics"
      onDeleteLocal={characteristics.remove}
    />
  )
}

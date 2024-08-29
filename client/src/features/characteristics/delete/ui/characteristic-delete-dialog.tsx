import { DialogDelete as DialogDeleteBase } from "shared/ui/dialog/dialog-delete"
import { useStores } from "features/categories/edit/model/context"

export const CharacteristicDeleteDialog = () => {
  const { characteristics } = useStores()

  return (
    <DialogDeleteBase
      onDeleteLocal={characteristics.remove}
    />
  )
}

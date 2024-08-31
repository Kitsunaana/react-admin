import { DialogDelete as DialogDeleteBase } from "shared/ui/dialog/dialog-delete"
import { CharacteristicsStore } from "entities/characteristic/model/store"

interface CharacteristicDeleteDialogProps {
  characteristics: CharacteristicsStore
}

export const CharacteristicDeleteDialog = (props: CharacteristicDeleteDialogProps) => {
  const { characteristics } = props

  return (
    <DialogDeleteBase onDeleteLocal={characteristics.remove} />
  )
}

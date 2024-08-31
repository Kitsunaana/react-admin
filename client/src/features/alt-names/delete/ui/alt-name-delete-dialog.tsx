import { DialogDelete as DialogDeleteBase } from "shared/ui/dialog/dialog-delete"
import { AltNamesStore } from "entities/alt-name"

interface AltNameDeleteDialogProps {
  altNames: AltNamesStore
}

export const AltNameDeleteDialog = (props: AltNameDeleteDialogProps) => {
  const { altNames } = props

  return <DialogDeleteBase onDeleteLocal={altNames.remove} />
}

import { IconButtonEdit } from "shared/ui/buttons/icon-button-edit"
import { IconButtonDelete } from "shared/ui/buttons/icon-button-delete"

export const Actions = ({
  langBase,
  onEdit,
  onRemove,
}: {
  langBase: string
  onEdit: () => void
  onRemove: () => void
}) => (
  <>
    <IconButtonEdit
      onClick={onEdit}
      langBase={langBase}
    />
    <IconButtonDelete
      onClick={onRemove}
      langBase={langBase}
    />
  </>
)

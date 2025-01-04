import { ReactNode } from "react"
import { Vertical } from "shared/ui/divider"
import { IconButtonEdit } from "shared/ui/buttons/icon-button-edit"
import { IconButtonDelete } from "shared/ui/buttons/icon-button-delete"
import { Container } from "./styles"

export const Actions = ({
  langBase,
  onEdit,
  onRemove,
  beforeActions,
}: {
  langBase: string
  onEdit: () => void
  onRemove: () => void
  beforeActions: ReactNode
}) => (
  <Container>
    {beforeActions}
    <Vertical />
    <IconButtonEdit
      onClick={onEdit}
      langBase={langBase}
    />
    <IconButtonDelete
      onClick={onRemove}
      langBase={langBase}
    />
  </Container>
)

import { memo } from "react"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import { Vertical } from "shared/ui/divider"
import { IconButtonEdit } from "shared/ui/buttons/icon-button-edit"
import { IconButtonDelete } from "shared/ui/buttons/icon-button-delete"
import { Container } from "./styles"

export const Actions = memo(({
  langBase,
  onRemove,
  onEdit,
}: {
  langBase: string
  onRemove: () => void
  onEdit: () => void
}) => (
  <Container>
    <Icon
      name="allowCategory"
      fontSize="small"
      color="success"
      help={{
        title: (
          <Text
            onlyText
            name="forCategory"
          />
        ),
      }}
    />
    <Vertical />
    <IconButtonEdit
      langBase={langBase}
      onClick={onEdit}
    />
    <IconButtonDelete
      langBase={langBase}
      onClick={onRemove}
    />
  </Container>
))

import { Mark } from "shared/ui/mark"
import { RowItem } from "shared/ui/row-item"
import { Text } from "shared/ui/text"
import { AltName } from "entities/alt-name"
import { Container } from "./styles"

export const RemoveConfirm = ({
  altName,
  langBase,
}: {
  langBase: string
  altName: AltName
}) => (
  <Container>
    <Text
      langBase={langBase}
      name="description"
    />
    <RowItem>
      <Text caption={altName.caption} />
      <Mark>{altName.locale.caption}</Mark>
    </RowItem>
  </Container>
)

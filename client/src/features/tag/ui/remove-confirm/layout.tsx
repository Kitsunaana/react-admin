import { TagView } from "entities/tag"
import { Tag } from "shared/types/new_types/types"
import { Mark } from "shared/ui/mark"
import { RowItem } from "shared/ui/row-item"
import { Text } from "shared/ui/text"
import { Container } from "./styles"

export const Layout = ({
  langBase,
  tag,
}: {
  langBase: string
  tag: Tag
}) => (
  <Container>
    <Text
      langBase={langBase}
      name="description"
      value={String(tag.id)}
      translateOptions={{
        components: {
          strong: <Mark />,
        },
      }}
    />
    <RowItem>
      <TagView
        caption={tag.caption}
        color={tag.color}
        icon={tag.icon}
      />
    </RowItem>
  </Container>
)

import { Box } from "shared/ui/box"
import { Mark } from "shared/ui/mark"
import { RowItem } from "shared/ui/row-item"
import { Text } from "shared/ui/text"

export const RemoveConfirm = ({
  langBase,
  category,
}: {
  langBase: string
  category: {
    id: string
    caption: string
  }
}) => (
  <Box flex gap>
    <Text
      langBase={langBase}
      name="description"
      value={String(category.id)}
      translateOptions={{
        components: {
          strong: <Mark />,
        },
      }}
    />
    <RowItem>
      <Text caption={category.caption} />
    </RowItem>
  </Box>
)

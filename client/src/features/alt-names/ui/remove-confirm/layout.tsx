import { AltName } from "shared/types/new_types/types"
import { Box } from "shared/ui/box"
import { Mark } from "shared/ui/mark"
import { RowItem } from "shared/ui/row-item"
import { Text } from "shared/ui/text"

interface LayoutProps {
  langBase: string
  altName: AltName
}

export const Layout = ({ altName, langBase }: LayoutProps) => (
  <Box flex gap>
    <Text
      langBase={langBase}
      name="description"
      value={String(altName.id)}
      translateOptions={{
        components: {
          strong: <Mark />,
        },
      }}
    />
    <RowItem>
      <Text caption={altName.caption} />
      <Mark>{altName.locale.caption}</Mark>
    </RowItem>
  </Box>
)

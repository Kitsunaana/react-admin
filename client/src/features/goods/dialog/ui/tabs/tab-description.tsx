import { DescriptionInput, Preview } from "shared/ui/description"
import { Divider } from "shared/ui/divider"
import { Box } from "shared/ui/box"
import { Text } from "shared/ui/text"

export const TabDescription = () => (
  <Box sx={{ py: 1 }}>
    <DescriptionInput />
    <Divider sx={{ my: 1 }}>
      <Text name="preview" />
    </Divider>
    <Preview />
  </Box>
)

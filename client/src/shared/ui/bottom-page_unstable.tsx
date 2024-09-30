import { Box } from "shared/ui/box"
import { alpha, IconButton, Pagination } from "@mui/material"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"

export const BottomPage_unstable = () => (
  <>
    <Box>
      <IconButton>
        <Icon name="check" />
      </IconButton>
    </Box>
    <Box flex ai row gap>
      <Text langBase="table.bottom" name="count" />
      <Box
        sx={{
          px: 1,
          py: 0.5,
          borderRadius: 1,
          backgroundColor: ({ palette }) => alpha(palette.grey["700"], 0.5),
        }}
      >
        79
      </Box>
      <Pagination
        count={3}
        variant="outlined"
        shape="rounded"
        onChange={(_, page) => {
          console.log(page)
        }}
      />
    </Box>
  </>
)

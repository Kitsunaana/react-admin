import { Box } from "shared/ui/Box"
import { alpha, IconButton, Pagination } from "@mui/material"
import { Icon } from "shared/ui/Icon"
import { Text } from "shared/ui/Text"
import React from "react"

export const Bottom = () => (
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
        onChange={(event, page) => {
          console.log(page)
        }}
      />
    </Box>
  </>
)

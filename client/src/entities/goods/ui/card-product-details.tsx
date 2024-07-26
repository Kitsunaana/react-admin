import { Box } from "shared/ui/box"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import React from "react"
import { Mark } from "shared/ui/mark"

export const CardProductDetails = () => (
  <Box
    flex
    row
    ai
    gap
    sx={{
      borderRadius: 0.5,
      borderLeft: ({ palette }) => `5px solid ${palette.success.main}`,
      pl: 1,
    }}
  >
    <Icon sx={{ fontSize: 20 }} name="folder" />
    <Text
      langBase="goods.table.row"
      name="price"
      value="Основной прайс"
      translateOptions={{
        components: {
          strong: <Mark />,
        },
      }}
    />
  </Box>
)

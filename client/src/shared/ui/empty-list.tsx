import { Box } from "shared/ui/box"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import React from "react"

export const EmptyList = () => (
  <Box flex grow ai jc>
    <Icon color="warning" name="empty" sx={{ fontSize: 80 }} />
    <Text langBase="global" name="listEmpty" />
  </Box>
)

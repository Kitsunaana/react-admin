import { Box } from "shared/ui/box"
import { Icon } from "shared/ui/icon"
import React from "react"
import { Text } from "shared/ui/text"

interface HiddenIndicatorProps {
  hidden: boolean
}

export const HiddenIndicator = (props: HiddenIndicatorProps) => {
  const { hidden } = props

  if (!hidden) return null

  return (
    <Box
      flex
      ai
      row
      sx={{ mr: 1 }}
      help={{ title: <Text name="hiddenForClient" />, arrow: true }}
    >
      <Icon
        name="invisible"
        fontSize="small"
        color="warning"
      />
    </Box>
  )
}

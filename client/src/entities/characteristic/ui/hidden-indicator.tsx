import { Box } from "shared/ui/box"
import { Icon } from "shared/ui/icon"
import React from "react"

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
      help={{ title: "Скрыть у клиента", arrow: true }}
    >
      <Icon
        name="invisible"
        fontSize="small"
        color="warning"
      />
    </Box>
  )
}

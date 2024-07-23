import { memo } from "react"
import { Box } from "shared/ui/Box"
import { Icon } from "shared/ui/Icon"
import { Text } from "shared/ui/Text"
import * as React from "react"

interface TabLabelProps {
  icon: string
  caption: string
}

export const TabLabel = memo((props: TabLabelProps) => {
  const { icon, caption } = props

  return (
    <Box flex ai gap row>
      <Icon name={icon} sx={{ fontSize: 20 }} />
      <Text caption={caption} sx={{ fontSize: 14, textTransform: "none" }} />
    </Box>
  )
})

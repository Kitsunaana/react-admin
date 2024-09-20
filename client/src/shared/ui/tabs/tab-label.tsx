import { SxProps } from "@mui/material"
import { memo } from "react"
import { Box } from "shared/ui/box"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import * as React from "react"

interface TabLabelProps {
  icon: string
  caption: string
  sx?: SxProps
  sxIcon?: SxProps
  sxText?: SxProps
}

export const TabLabel = memo((props: TabLabelProps) => {
  const {
    icon, caption, sx, sxIcon, sxText,
  } = props

  return (
    <Box flex ai gap row sx={sx}>
      <Icon name={icon} sx={{ fontSize: 20, ...sxIcon }} />
      <Text langBase="" name={caption} sx={{ fontSize: 14, textTransform: "none", ...sxText }} />
    </Box>
  )
})

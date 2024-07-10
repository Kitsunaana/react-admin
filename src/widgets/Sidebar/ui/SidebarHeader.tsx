import { Box, Typography } from "@mui/material"
import * as React from "react"
import { memo } from "react"
import { MenuButton } from "./MenuButton"

interface SidebarHeaderProps {
  onToggle: () => void
  open: boolean
}

export const SidebarHeader = memo((props: SidebarHeaderProps) => {
  const { open, onToggle } = props

  return (
    <Box>
      <MenuButton onClick={onToggle} open={open} />
      {open && (
      <Typography
        sx={{ position: "absolute", top: 17, left: 45 }}
      >
        Магазин
      </Typography>
      )}
    </Box>
  )
})

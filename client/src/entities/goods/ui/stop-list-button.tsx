import { IconButton } from "@mui/material"
import { Icon } from "shared/ui/icon"
import React from "react"

export const StopListButton = () => (
  <IconButton
    sx={{
      p: 0.5,
      mr: 1,
    }}
    onClick={(event) => event.stopPropagation()}
  >
    <Icon sx={{ fontSize: 20 }} name="stopList" />
  </IconButton>
)

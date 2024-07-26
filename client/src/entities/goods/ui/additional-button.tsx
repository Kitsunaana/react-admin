import { IconButton } from "@mui/material"
import { Icon } from "shared/ui/icon"
import React from "react"

export const AdditionalButton = () => (
  <IconButton
    sx={{ p: 0.5 }}
    onClick={(event) => event.stopPropagation()}
  >
    <Icon
      sx={{ fontSize: 20 }}
      name="additional"
    />
  </IconButton>
)

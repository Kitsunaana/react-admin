import { IconButton } from "shared/ui/icon-button"
import React from "react"

export const BackButton = () => (
  <IconButton
    name="back"
    color="warning"
    fontSize={20}
    onClick={() => {
      window.history.back()
    }}
  />
)

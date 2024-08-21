import { IconButtonBase } from "shared/ui/buttons/icon-button-base"
import React from "react"

export const BackButton = () => (
  <IconButtonBase
    name="back"
    color="warning"
    fontSize={20}
    onClick={() => {
      window.history.back()
    }}
  />
)

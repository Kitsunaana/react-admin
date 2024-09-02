import React from "react"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Text } from "shared/ui/text"

export const BackButton = () => (
  <IconButton
    help={{ arrow: true, title: <Text onlyText name="back" /> }}
    name="back"
    color="warning"
    fontSize={20}
    onClick={() => {
      window.history.back()
    }}
  />
)

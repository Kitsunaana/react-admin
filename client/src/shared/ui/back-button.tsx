import React from "react"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Text } from "shared/ui/text"
import { IconButtonProps } from "shared/ui/buttons/icon-button-base"

interface BackButtonProps extends Omit<IconButtonProps, "name"> {}

export const BackButton = ({ onClick, ...other }: BackButtonProps) => (
  <IconButton
    help={{ arrow: true, title: <Text onlyText name="back" /> }}
    name="back"
    color="warning"
    fontSize={20}
    {...other}
    onClick={(event) => {
      window.history.back()
      onClick?.(event)
    }}
  />
)

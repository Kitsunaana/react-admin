import { IconButtonBase as BaseIconButton, IconButtonProps } from "shared/ui/buttons/icon-button-base"
import { Box } from "shared/ui/box"
import React from "react"
import { TooltipProps } from "@mui/material"

interface ButtonProps extends IconButtonProps {
  help?: Omit<TooltipProps, "children">
}

export const IconButton = (props: ButtonProps) => {
  const { help, ...other } = props

  const iconButton = <BaseIconButton {...other} />

  if (help) {
    return (<Box help={help}>{iconButton}</Box>)
  }

  return (<Box>{iconButton}</Box>)
}

import React from "react"
import { TooltipProps } from "@mui/material"
import { IconButton } from "shared/ui/buttons/icon-button"
import { IconButtonProps } from "shared/ui/icon-button"

interface IconButtonDeleteProps extends Omit<IconButtonProps, "name"> {
  help?: boolean | Omit<TooltipProps, "children">
}

export const IconButtonDelete = (props: IconButtonDeleteProps) => {
  const { help = true, ...other } = props

  return (
    <IconButton
      fontSize={20}
      color="warning"
      name="delete"
      help={{ title: "Удалить", arrow: true }}
      {...other}
    />
  )
}

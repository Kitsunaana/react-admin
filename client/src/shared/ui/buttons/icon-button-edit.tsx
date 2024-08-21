import React from "react"
import { TooltipProps } from "@mui/material"
import { IconButton } from "shared/ui/buttons/icon-button"
import { IconButtonProps } from "shared/ui/buttons/icon-button-base"

interface IconButtonEditProps extends Omit<IconButtonProps, "name"> {
  help?: boolean | Omit<TooltipProps, "children">
}

export const IconButtonEdit = (props: IconButtonEditProps) => {
  const { help = true, ...other } = props

  return (
    <IconButton
      fontSize={20}
      color="primary"
      name="edit"
      help={{ title: "Редактировать", arrow: true }}
      {...other}
    />
  )
}

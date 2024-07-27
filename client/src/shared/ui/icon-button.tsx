import { Icon } from "shared/ui/icon"
import React from "react"
import {
  IconButton as MUIIconButton, IconButtonProps as MUIIconButtonProps, Theme,
} from "@mui/material"
import { SxProps } from "@mui/system"

interface IconButtonProps extends MUIIconButtonProps {
  name: string
  sxIcon?: SxProps<Theme>
  fontSize?: number
}

export const IconButton = (props: IconButtonProps) => {
  const {
    // variant, sx, sxIcon, name, ...otherProps
    sx, name, sxIcon, fontSize, ...otherProps
  } = props

  return (
    <MUIIconButton sx={{ p: 0.5, ...sx }} {...otherProps}>
      <Icon
        name={name}
        sx={{
          fontSize,
          ...sxIcon,
        }}
      />
    </MUIIconButton>
  )
}

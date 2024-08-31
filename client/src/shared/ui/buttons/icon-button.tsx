import { IconButtonBase as BaseIconButton, IconButtonProps } from "shared/ui/buttons/icon-button-base"
import { Box } from "shared/ui/box"
import React from "react"
import { CircularProgress, TooltipProps } from "@mui/material"

interface ButtonProps extends IconButtonProps {
  help?: Omit<TooltipProps, "children">
  isLoading?: boolean
}

export const IconButton = (props: ButtonProps) => {
  const { help, isLoading, ...other } = props

  const iconButton = <BaseIconButton {...other} />

  if (help) {
    return (<Box help={help}>{iconButton}</Box>)
  }

  if (isLoading) {
    return (
      <Box flex ai jc sx={{ width: 32, height: 32 }}>
        <CircularProgress size={24} />
      </Box>
    )
  }

  return (<Box>{iconButton}</Box>)
}

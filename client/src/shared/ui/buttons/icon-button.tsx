import { IconButtonBase as BaseIconButton, IconButtonProps } from "shared/ui/buttons/icon-button-base"
import { Box } from "shared/ui/box"
import React from "react"
import {
  Badge as MUIBadge, BadgeProps, CircularProgress, TooltipProps,
} from "@mui/material"
import styled from "styled-components"

interface ButtonProps extends IconButtonProps {
  help?: Omit<TooltipProps, "children">
  isLoading?: boolean
  badge?: BadgeProps
}

const Badge = styled(MUIBadge)`
  & .MuiBadge-badge {
    padding-left: 2px;
    padding-right: 2px;
    top: 3px;
    z-index: 0;
  }
`

export const IconButton = (props: ButtonProps) => {
  const {
    help, isLoading, badge, ...other
  } = props

  let iconButton = <BaseIconButton {...other} />

  if (badge) {
    iconButton = <Badge {...badge}>{iconButton}</Badge>
  }

  if (help && !isLoading) {
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

import { ListItemIconProps as MUIListItemIconProps } from "@mui/material/ListItemIcon/ListItemIcon"
import { memo } from "react"
import { ListItemIcon as MUIListItemIcon } from "@mui/material"
import { Icon } from "shared/ui/Icon"
import * as React from "react"

interface ListItemIconProps extends MUIListItemIconProps {
  icon: string
  disabled: boolean
  open: boolean
}

export const ListItemIcon = memo((props: ListItemIconProps) => {
  const {
    icon, disabled, open, ...other
  } = props

  return (
    <MUIListItemIcon
      {...other}
      sx={{
        minWidth: 0,
        maxWidth: 24,
        width: 1,
        mr: open ? 1 : 0,
        ...other?.sx,
      }}
    >
      <Icon
        name={icon}
        sx={{ color: ({ palette }) => (disabled ? palette.text.disabled : null) }}
      />
    </MUIListItemIcon>
  )
})

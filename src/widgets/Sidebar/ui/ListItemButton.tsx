import { ListItemButtonProps as MUIListItemButtonProps } from "@mui/material/ListItemButton/ListItemButton"
import { memo } from "react"
import MUIListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import { Icon } from "../../../shared/ui/Icon"
import ListItemText from "@mui/material/ListItemText"
import * as React from "react"
import { Link } from "../../../shared/ui/Link"

export type ListItemButtonProps = {
  caption: string;
  icon: string;
  path: string;
  optionId?: number;
  onSelectOption: (optionId?: number) => void
  open: boolean
} & MUIListItemButtonProps

export const ListItemButton = memo((props: ListItemButtonProps) => {
  const {
    caption,
    sx,
    children,
    disabled,
    icon,
    path,
    onSelectOption,
    optionId,
    open,
    ...otherProps
  } = props

  const handleOnSelect = () => {
    onSelectOption(optionId)
  }

  return (
    <MUIListItemButton
      onClick={handleOnSelect}
      sx={{
        height: 35,
        p: 0,
        px: open ? 1: 0,
        ...sx
      }} {...otherProps}
    >
      <Link to={path}>
        <ListItemIcon
          sx={{
            minWidth: 0,
            maxWidth: 24,
            width: 1,
            mr: open ? 1 : 0
          }}
        >
          <Icon
            name={icon}
            sx={{ color: ({ palette }) => disabled && palette.text.disabled }}
          />
        </ListItemIcon>
        {open && <ListItemText
          primary={caption}
          sx={{
            color: ({ palette }) => disabled && palette.text.disabled,
            width: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        />}
      </Link>
      {children}
    </MUIListItemButton>
  )
})

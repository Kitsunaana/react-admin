import { memo } from "react"
import {
  ListItemTextProps as MUIListItemTextProps,
  ListItemIconProps as MUIListItemIconProps,
  ListItemText as MUIListItemText,
  ListItemIcon as MUIListItemIcon,
  ListItemButton as MUIListItemButton,
  ListItemButtonProps as MUIListItemButtonProps, Tooltip,
} from "@mui/material"
import * as React from "react"
import { dispatch } from "shared/lib/event"
import { Icon } from "shared/ui/Icon"

interface ListItemIconProps extends MUIListItemIconProps{
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
        sx={{ color: ({ palette }) => disabled ? palette.text.disabled : null }}
      />
    </MUIListItemIcon>
  )
})

interface ListItemTextProps extends MUIListItemTextProps {
  caption: string
  disabled: boolean
}

export const ListItemText = memo((props: ListItemTextProps) => {
  const { caption, disabled } = props

  return (
    <MUIListItemText
      primary={caption}
      sx={{
        color: ({ palette }) => disabled ? palette.text.disabled : null,
        width: 1,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    />
  )
})

export type ListItemButtonProps = {
  caption: string
  icon: string
  path: string
  optionId?: number
  listId: number
  open: boolean

  isSelected: boolean
} & MUIListItemButtonProps

export const ListItemButton = memo((props: ListItemButtonProps) => {
  const {
    caption,
    sx,
    children,
    disabled,
    icon,
    path,
    optionId,
    listId,
    open,
    isSelected,
    ...otherProps
  } = props

  const handleOnSelect = () => {
    dispatch("selected", {
      selectedId: listId,
      selectedOptionId: (disabled || !optionId) ? null : optionId
    })
  }

  const renderButton = (
    <MUIListItemButton
      onClick={handleOnSelect}
      sx={{
        backgroundColor: isSelected ? "rgba(25, 118, 210, 0.08)" : null,
        height: 35,
        p: 0,
        px: open ? 1 : 0,
        pr: 0,
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        ...sx,
      }}
      {...otherProps}
    >
      <ListItemIcon open={open} icon={icon} disabled={disabled ?? false} />
      {open && <ListItemText caption={caption} disabled={disabled ?? false} />}
      {children}
    </MUIListItemButton>
  )

  if ((disabled || !open)) {
    return (
      <Tooltip
        title={disabled ? "Доступно только при переходе из другого режима" : caption}
        placement="right"
        arrow
      >
        {renderButton}
      </Tooltip>
    )
  }

  return renderButton
})

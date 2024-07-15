import { memo } from "react"
import {
  ListItemButton as MUIListItemButton,
  ListItemButtonProps as MUIListItemButtonProps, Tooltip,
} from "@mui/material"
import * as React from "react"
import { dispatch } from "shared/lib/event"
import { ListItemText } from "./ListItemText"
import { ListItemIcon } from "./ListItemIcon"

export type ListItemButtonProps = {
  caption: string
  icon: string
  path: string
  optionId?: number
  listId: number
  open: boolean
  name: string

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
    name,
    ...otherProps
  } = props

  const handleOnSelect = () => {
    dispatch("selected", {
      selectedId: listId,
      selectedOptionId: (disabled || !optionId) ? null : optionId,
    })

    dispatch("route", { route: path })
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
      {open && <ListItemText disabled={disabled ?? false} name={name} />}
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

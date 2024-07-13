import { ListItemButtonProps as MUIListItemButtonProps } from "@mui/material/ListItemButton/ListItemButton"
import { memo, useEffect, useState } from "react"
import MUIListItemButton from "@mui/material/ListItemButton"
import MUIListItemIcon, { ListItemIconProps } from "@mui/material/ListItemIcon"
import MUIListItemText, { ListItemTextProps } from "@mui/material/ListItemText"
import * as React from "react"
import { Tooltip } from "@mui/material"
import { Icon } from "../../../shared/ui/Icon"
import { shallowEqual } from "../../../shared/lib/utils"
import { addEvent, dispatch } from "../../../shared/lib/event"

export const ListItemIcon = memo((props: { icon: string; disabled: boolean; open: boolean } & ListItemIconProps) => {
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
        sx={{ color: ({ palette }) => disabled && palette.text.disabled }}
      />
    </MUIListItemIcon>
  )
})

export const ListItemText = memo((props: { caption: string; disabled: boolean } & ListItemTextProps) => {
  const { caption, disabled } = props

  return (
    <MUIListItemText
      primary={caption}
      sx={{
        color: ({ palette }) => disabled && palette.text.disabled,
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
  listId?: number
  onSelectOption: (optionId?: number) => void
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
    onSelectOption,
    optionId,
    listId,
    open,
    isSelected,
    ...otherProps
  } = props

  const handleOnSelect = () => {
    // onSelectOption(optionId)

    // console.log({ listId, optionId })

    dispatch("selected", { selectedId: listId, selectedOptionId: (disabled || !optionId) ? null : optionId } satisfies {
      selectedId: number
      selectedOptionId: number | null
    })
  }

  return (
  // <Tooltip title={(disabled || !open) && caption} placement="right" arrow>
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
      <ListItemIcon open={open} icon={icon} disabled={disabled} />
      {open && <ListItemText caption={caption} disabled={disabled} />}
      {children}
    </MUIListItemButton>
  // </Tooltip>
  )
})

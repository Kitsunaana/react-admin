import { memo } from "react"
import {
  alpha,
  ListItemButton as MUIListItemButton,
  ListItemButtonProps as MUIListItemButtonProps, Tooltip,
} from "@mui/material"
import * as React from "react"
import { dispatch } from "shared/lib/event"
import { Text } from "shared/ui/text"
import { actionParams } from "shared/lib/params"
import { ListItemText } from "./list-item-text"
import { ListItemIcon } from "./list-item-icon"

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
        backgroundColor: ({ palette }) => (isSelected ? alpha(palette.primary.dark, 0.10) : undefined),
        height: 35,
        p: 0,
        px: open ? 1 : 0,
        pr: 0,
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        "&:hover": {
          backgroundColor: ({ palette }) => (isSelected ? alpha(palette.primary.dark, 0.15) : undefined),
        },
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
        title={disabled ? <Text name="not-available" onlyText /> : <Text name={name} onlyText />}
        placement="right"
        arrow
      >
        {renderButton}
      </Tooltip>
    )
  }

  return renderButton
})

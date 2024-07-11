import ListItemIcon from "@mui/material/ListItemIcon"
import Box from "@mui/material/Box"
import {
  ListItemButton as MUIListItemButton, Tooltip, Typography, ListItemButtonProps as MUIListItemButtonProps,
} from "@mui/material"
import * as React from "react"
import { memo, ReactNode, useCallback } from "react"
import { useDispatch } from "react-redux"
import { Icon } from "../../../shared/ui/Icon"
import { selectMenuItem } from "../model/sidebarSlice"
import { SidebarExpandButton } from "./SidebarExpandButton"

interface SidebarMenuItemProps {
  isActive: boolean
  isExpanded: boolean

  caption: string
  isList?: boolean
  open?: boolean
  showExpandButton?: boolean
  disabled?: boolean
  icon: string
  listId: number
  sublistId?: number

  onToggleExpand: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onSelectedMenuItem: (sublistId: number) => void
}

interface SidebarIconProps {
  icon: string
  disabled: boolean
}

export const SidebarIcon = memo((props: SidebarIconProps) => {
  const { icon, disabled } = props

  return (
    <ListItemIcon
      sx={{
        minWidth: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon
        name={icon}
        sx={{ color: ({ palette }) => disabled && palette.text.disabled }}
      />
    </ListItemIcon>
  )
})

interface ListItemButtonProps extends MUIListItemButtonProps {
  onSelectedMenuItem: () => void
  sublistId: number
  isActive: boolean
  isExpanded: boolean
  open: boolean
  isList: boolean
}

const shallowEqual = (prev, next) => {
  const keysPrev = Object.keys(prev)
  const keysNext = Object.keys(next)

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keysPrev) {
    if (prev[key] !== next[key]) {
      console.log({ [`${key}-prev`]: prev[key], [`${key}-next`]: next[key] })
    }
  }

  return true
}

export const ListItemButton = memo((props: ListItemButtonProps) => {
  const {
    children, onSelectedMenuItem, sublistId, isActive, isExpanded, open, isList,
  } = props

  return (
    <MUIListItemButton
      onClick={onSelectedMenuItem}
      sx={{
        p: 0.5,
        minHeight: sublistId && 40,
        backgroundColor: isActive ? "rgba(25, 118, 210, 0.08)" : null,
        transition: "height .3s",
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: (isActive && !isExpanded) ? 4 : 0,
        ...(open ? {
          borderLeft: (isList && isActive)
            ? "4px solid rgb(3, 169, 244)"
            : isList
              ? "4px solid transparent"
              : null,
        } : {}),
      }}
    >
      {children}
    </MUIListItemButton>
  )
})

interface SidebarCaptionProps {
  disabled: boolean
  caption: string
}

export const SidebarCaption = memo((props: SidebarCaptionProps) => {
  const { caption, disabled } = props

  return (
    <Typography
      sx={{
        fontWeight: 400,
        width: 1,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        color: ({ palette }) => disabled && palette.text.disabled,
      }}
    >
      {caption}
    </Typography>
  )
})

interface SidebarMenuItemContainerProps {
  isList: boolean
  open: boolean
  icon: string
  disabled: boolean
  caption: string
  children: ReactNode
}

export const SidebarMenuItemContainer = memo((props: SidebarMenuItemContainerProps) => {
  const {
    open, isList, caption, icon, disabled, children,
  } = props

  return (
    <Box
      title="container"
      sx={{
        display: "flex",
        width: 1,
        alignItems: "center",
        justifyContent: "space-between",
        ...(!isList && open ? { pl: 1.5 } : {}),
      }}
    >
      <SidebarIcon
        icon={icon}
        disabled={disabled}
      />
      <SidebarCaption
        caption={caption}
        disabled={disabled}
      />
      {children}
    </Box>
  )
})

export const MenuItem = memo((props: SidebarMenuItemProps) => {
  const {
    isActive,
    isExpanded,
    caption,
    isList,
    open,
    showExpandButton,
    disabled,
    icon,
    listId,
    sublistId,
    onToggleExpand,
    onSelectedMenuItem
  } = props

  const dispatch = useDispatch()

  const handleOnSelectedMenuItem = useCallback(() => {
    return onSelectedMenuItem(sublistId)
  }, [])

  return (
  /* <Tooltip
      title={!open && !disabled ? caption : "Доступно только при переходе из другого режима"}
      arrow
      placement="right"
      disableHoverListener={open && !disabled}
      disableFocusListener={open && !disabled}
      disableInteractive
    > */


    <ListItemButton
      onSelectedMenuItem={handleOnSelectedMenuItem}
      sublistId={sublistId}
      isActive={isActive}
      isExpanded={isExpanded}
      open={open}
      isList={isList}
    >

      <SidebarMenuItemContainer
        isList={isList}
        open={open}
        caption={caption}
        icon={icon}
        disabled={disabled}
      >
        {showExpandButton && (
          <SidebarExpandButton
            isExpanded={isExpanded}
            open={open}
            onToggleExpand={onToggleExpand}
          />
        )}
      </SidebarMenuItemContainer>
    </ListItemButton>
  // </Tooltip>
  )
})

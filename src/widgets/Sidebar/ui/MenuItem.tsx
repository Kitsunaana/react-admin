import ListItemIcon from "@mui/material/ListItemIcon"
import Box from "@mui/material/Box"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {
  ListItemButton as MUIListItemButton, Tooltip, Typography,
} from "@mui/material"
import * as React from "react"
import { memo } from "react"
import { Icon } from "../../../shared/ui/Icon"

interface SidebarMenuItemProps {
  isActive?: boolean
  isExpanded?: boolean
  caption: string
  isList?: boolean
  open?: boolean
  showExpandButton?: boolean
  disabled?: boolean
  icon: string
  listId: number
  sublistId?: number

  onToggleExpand?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onClick: (props: { listId: number; sublistId: number }) => void
}

export const MenuItem = memo((props: SidebarMenuItemProps) => {
  const {
    isActive, isExpanded, caption, onToggleExpand, isList, onClick, open, showExpandButton, disabled, icon, listId, sublistId,
  } = props

  return (
    <Tooltip
      title={!open && !disabled ? caption : "Доступно только при переходе из другого режима"}
      arrow
      placement="right"
      disableHoverListener={open && !disabled}
      disableFocusListener={open && !disabled}
      disableInteractive
    >

      <MUIListItemButton
        onClick={() => onClick({ listId, sublistId })}
        sx={{
          p: 0.5,
          minHeight: sublistId && 40,
          backgroundColor: isActive ? "rgba(25, 118, 210, 0.08)" : null,
          transition: "height .3s",
          borderTopLeftRadius: 4,
          borderBottomLeftRadius: (isActive && !isExpanded) ? 4 : 0,
          height: (open || !showExpandButton) ? 40 : 20,
          ...(open ? { borderLeft: (isList && isActive) ? "4px solid rgb(3, 169, 244)" : "4px solid transparent" } : {}),
        }}
      >
        {open && (
        <>
          <ListItemIcon sx={{
            minWidth: 30,
          }}
          >
            <Icon name={icon} sx={{ color: ({ palette }) => disabled && palette.text.disabled }} />
          </ListItemIcon>
          <Typography sx={{
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
        </>
        )}

        {!open && !showExpandButton && (
        <ListItemIcon sx={{
          minWidth: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        >
          <Icon name={icon} sx={{ color: ({ palette }) => disabled && palette.text.disabled }} />
        </ListItemIcon>
        )}

        {(showExpandButton) && (
        <Box
          onClick={onToggleExpand}
          sx={{
            p: 0.8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            "&::before, &::after": {
              content: "''",
              position: "absolute",
              width: "10px",
              height: "1px",
              top: "50%",
              transform: "translate(0, -50%)",
              backgroundColor: ({ palette }) => (open ? null : palette.grey["300"]),
            },
            "&::before": {
              left: -5,
            },
            "&::after": {
              right: -5,
            },
          }}
        >
          <KeyboardArrowDownIcon
            sx={{
              fontSize: 18,
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: ".3s",
            }}
          />
        </Box>
        )}
      </MUIListItemButton>
    </Tooltip>
  )
})

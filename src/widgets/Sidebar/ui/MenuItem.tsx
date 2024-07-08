import ListItemIcon from "@mui/material/ListItemIcon"
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket"
import ListItemText from "@mui/material/ListItemText"
import Box from "@mui/material/Box"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import ListItemButton from "@mui/material/ListItemButton"
import * as React from "react"
import { memo } from "react"
import { Icon } from "../../../shared/ui/Icon"

interface SidebarMenuItemProps {
  isActive?: boolean
  isExpanded?: boolean
  caption: string
  onClose?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  isList?: boolean
  onClick?: () => void
  open?: boolean
  showExpandButton?: boolean
  disabled?: boolean
  icon: string
}

export const MenuItem = memo((props: SidebarMenuItemProps) => {
  const {
    isActive, isExpanded, caption, onClose, isList, onClick, open, showExpandButton, disabled, icon,
  } = props

  return (
    <ListItemButton
      disabled={disabled}
      onClick={onClick}
      sx={{
        p: 0.5,
        /* display: "flex",
        justifyContent: "center",
        alignItems: "center", */
        transition: "height .3s",
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: isExpanded ? 0 : 4,
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
            <Icon name={icon} />
          </ListItemIcon>
          <ListItemText primary={caption} />
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
          <Icon name={icon} />
        </ListItemIcon>
      )}

      {(showExpandButton) && (
        <Box
          onClick={onClose}
          sx={{
            p: 0.8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            "&::before": {
              content: "''",
              position: "absolute",
              width: "10px",
              height: "1px",
              top: "50%",
              left: -5,
              transform: "translate(0, -50%)",
              backgroundColor: ({ palette }) => (open ? null : palette.grey["300"]),
            },
            "&::after": {
              content: "''",
              position: "absolute",
              width: "10px",
              height: "1px",
              top: "50%",
              right: -5,
              transform: "translate(0, -50%)",
              backgroundColor: ({ palette }) => (open ? null : palette.grey["300"]),
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
    </ListItemButton>
  )
})

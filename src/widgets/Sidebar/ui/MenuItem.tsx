import ListItemIcon from "@mui/material/ListItemIcon"
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket"
import ListItemText from "@mui/material/ListItemText"
import Box from "@mui/material/Box"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import ListItemButton from "@mui/material/ListItemButton"
import * as React from "react"
import { memo } from "react"

interface SidebarMenuItemProps {
  isActive?: boolean
  isExpanded?: boolean
  caption: string
  onClose?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  isList?: boolean
  onClick?: () => void
}

export const MenuItem = memo((props: SidebarMenuItemProps) => {
  const {
    isActive, isExpanded, caption, onClose, isList, onClick,
  } = props

  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        p: 0.5,
        borderLeft: (isList && isActive) ? "4px solid rgb(3, 169, 244)" : "4px solid transparent",
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: isExpanded ? 0 : 4,
      }}
    >
      <ListItemIcon sx={{ minWidth: 30 }}>
        <ShoppingBasketIcon />
      </ListItemIcon>
      <ListItemText primary={caption} />

      {isList && (
        <Box
          onClick={onClose}
          sx={{
            p: 0.8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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

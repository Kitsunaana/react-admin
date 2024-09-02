import React, { memo, ReactNode } from "react"
import { MenuItem } from "@mui/material"
import { Text } from "shared/ui/text"
import { Icon } from "shared/ui/icon"

type VariantTheme = "warning" | "danger" | "info" | "success" | "primary" | "secondary"

interface MenuActionItemProps {
  onClick?: () => void
  caption: string
  icon: string
  variantText?: VariantTheme
  variantIcon?: VariantTheme
}

export const ContextMenuItem = memo((props: MenuActionItemProps) => {
  const {
    caption, variantIcon, variantText, icon, onClick,
  } = props

  return (
    <MenuItem
      onClick={onClick}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        borderRadius: 2,
        mx: 1,
      }}
    >
      <Text
        name={caption}
        sx={{
          color: ({ palette }) => (variantText ? palette[variantText].main : null),
        }}
      />
      <Icon
        name={icon}
        sx={{
          color: ({ palette }) => (variantIcon ? palette[variantIcon].main : null),
          fontSize: 20,
        }}
      />
    </MenuItem>
  )
})

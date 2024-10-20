import { AlertColor, MenuItem } from "@mui/material"
import { styled } from "@mui/material/styles"
import { memo } from "react"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"

const StyledMenuItem = styled(MenuItem)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8,
  borderRadius: 8,
  margin: "0px 8px",
}))

type VariantTheme = AlertColor | "primary" | "secondary"

interface MenuActionItemProps {
  onClick?: () => void
  caption: string
  icon: string
  variantText?: VariantTheme
  variantIcon?: VariantTheme
}

export const ContextMenuItem = memo((props: MenuActionItemProps) => {
  const {
    caption,
    variantIcon,
    variantText,
    icon,
    onClick,
  } = props

  return (
    <StyledMenuItem onClick={onClick}>
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
    </StyledMenuItem>
  )
})

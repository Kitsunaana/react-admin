import { BoxProps } from "shared/ui/box"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import { TagView } from "./components"

interface LayoutProps extends BoxProps {
  color: string
  caption: string
  icon: string | null
}

export const Layout = (props: LayoutProps) => {
  const {
    color,
    caption,
    icon,
    ...other
  } = props

  return (
    <TagView
      sx={{ backgroundColor: color }}
      color={color}
      {...other}
    >
      {icon && (
        <Icon
          fontSize="small"
          sx={{
            color: ({ palette }) => palette.getContrastText(color),
          }}
        >
          {icon}
        </Icon>
      )}
      <Text
        caption={caption}
        sx={{
          color: ({ palette }) => palette.getContrastText(color),
        }}
      />
    </TagView>
  )
}

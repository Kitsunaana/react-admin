import { BoxProps } from "shared/ui/box"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import { TagView as StyledTagView } from "./styles"

export const TagView = ({
  color,
  caption,
  icon,
  ...other
}: BoxProps & {
  color: string
  caption: string
  icon: string | null
}) => (
  <StyledTagView
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
  </StyledTagView>
)

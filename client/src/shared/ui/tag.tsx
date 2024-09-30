import { AlertColor, alpha, useTheme } from "@mui/material"
import { Text as BaseText } from "shared/ui/text"
import { Mark } from "shared/ui/mark"
import { styled } from "@mui/material/styles"

interface TagProps {
  caption: string
  variant?: AlertColor
}

const Text = styled(BaseText)`
  margin-right: 8px;
  font-size: 12px;
`

export const Tag = (props: TagProps) => {
  const { variant, caption } = props
  const { palette } = useTheme()

  return (
    <Text
      caption={(
        <Mark
          style={{
            backgroundColor: variant
              ? alpha(palette[variant].main, 0.65)
              : "rgba(255, 255, 255, 0.12)",
          }}
        >
          {caption}
        </Mark>
      )}
    />
  )
}

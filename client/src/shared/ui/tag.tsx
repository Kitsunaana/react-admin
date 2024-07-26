import { alpha, useTheme } from "@mui/material"
import { Text } from "shared/ui/text"
import React from "react"
import { Mark } from "shared/ui/mark"

type PaletteColor = "primary" | "secondary" | "error" | "warning" | "info" | "success"

interface TagProps {
  caption: string
  variant?: PaletteColor
}

export const Tag = (props: TagProps) => {
  const { variant, caption } = props

  const { palette } = useTheme()

  return (
    <Text
      sx={{
        mr: 1,
        fontSize: 12,
      }}
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

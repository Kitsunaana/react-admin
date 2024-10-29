import { alpha, useTheme } from "@mui/material"
import { CSSProperties, PropsWithChildren } from "react"

export interface MarkProps extends PropsWithChildren {
  style?: CSSProperties
  color?: "warning" | "success" | "error" | "def"
  fontSize?: number
}

export const Mark = (props: MarkProps) => {
  const {
    style,
    children,
    fontSize,
    color = "def",
  } = props

  const { palette } = useTheme()

  const backgroundColor = {
    dark: {
      def: alpha(palette.common.white, 0.12),
      warning: alpha(palette.warning.dark, 0.5),
      success: alpha(palette.success.dark, 0.5),
      error: palette.error.dark,
    },
    light: {
      def: alpha(palette.common.black, 0.12),
      warning: alpha(palette.warning.light, 0.75),
      success: alpha(palette.success.light, 0.75),
      error: alpha(palette.error.light, 0.75),
    },
  }

  return (
    <strong
      style={{
        fontWeight: "unset",
        padding: "2px 8px",
        display: "inline",
        borderRadius: "4px",
        backgroundColor: backgroundColor[palette.mode][color],
        fontSize: fontSize ?? "inherit",
        ...(style || {}),
      }}
    >
      {children}
    </strong>
  )
}

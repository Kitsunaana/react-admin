import { CSSProperties, PropsWithChildren } from "react"
import { alpha, useTheme } from "@mui/material"

interface MarkProps extends PropsWithChildren {
  style?: CSSProperties
}

export const Mark = (props: MarkProps) => {
  const { style, children } = props

  const { palette } = useTheme()

  return (
    <strong
      style={{
        fontWeight: "unset",
        padding: "2px 8px",
        display: "inline-flex",
        borderRadius: "4px",
        backgroundColor: alpha(palette.mode === "dark"
          ? palette.common.white
          : palette.common.black, 0.12),
        ...(style ?? {}),
      }}
    >
      {children}
    </strong>
  )
}

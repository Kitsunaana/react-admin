import React, { CSSProperties, PropsWithChildren } from "react"

interface MarkProps extends PropsWithChildren {
  style?: CSSProperties
}

export const Mark = (props: MarkProps) => {
  const { style, children } = props

  return (
    <strong
      style={{
        fontWeight: "unset",
        padding: "2px 8px",
        display: "inline-flex",
        borderRadius: "4px",
        backgroundColor: "rgba(255, 255, 255, 0.12)",
        ...(style ?? {}),
      }}
    >
      {children}
    </strong>
  )
}

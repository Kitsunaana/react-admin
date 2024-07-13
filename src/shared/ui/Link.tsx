import { memo } from "react"
import { Link as RRDLink, LinkProps } from "react-router-dom"
import * as React from "react"

export const Link = memo((props: LinkProps) => {
  console.log(1)
  return (
    <RRDLink
      {...props}
      style={{
        textDecoration: "none",
        color: "inherit",
        ...props.style,
      }}
    >
      {props.children}
    </RRDLink>
  )
})

import { memo } from "react"
import { Link as RRDLink, LinkProps } from "react-router-dom"
import * as React from "react"

export const Link = memo((props: LinkProps) => {
  return <RRDLink style={{
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "center"
  }} {...props}>{props.children}</RRDLink>
})

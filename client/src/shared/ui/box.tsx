import {
  Box as MUIBox, BoxProps as MUIBoxProps, Theme, Tooltip, TooltipProps,
} from "@mui/material"
import { CSSProperties, forwardRef } from "react"
import { StandardLonghandProperties } from "csstype"

export interface BoxProps extends Omit<MUIBoxProps, "gap" | "flex"> {
  flex?: boolean
  grid?: boolean
  ai?: boolean | StandardLonghandProperties["alignItems"]
  jc?: boolean | StandardLonghandProperties["justifyContent"]
  jc_sp?: boolean
  center?: boolean
  row?: boolean
  gap?: boolean | number
  grow?: boolean | number
  strong?: boolean,
  help?: Omit<TooltipProps, "children">,

  theme?: Theme
}

export const Box = forwardRef((props: BoxProps, ref) => {
  const {
    flex, grid, ai, jc, jc_sp, center, row, gap, grow, strong, help, sx, ...other
  } = props

  const newSx: CSSProperties = {}

  if (flex) {
    newSx.display = "flex"
    newSx.flexDirection = "column"
  }

  if (grid) {
    newSx.display = "grid"
  }

  if (ai) {
    newSx.alignItems = ai === true ? "center" : ai
  }

  if (jc) {
    newSx.justifyContent = jc === true ? "center" : jc
  }

  if (jc_sp) {
    newSx.justifyContent = "space-between"
  }

  if (center) {
    newSx.alignItems = "center"
    newSx.justifyContent = "center"
  }

  if (row) {
    newSx.flexDirection = "row"
  }

  if (gap) {
    newSx.gap = gap === true ? 1 : gap
  }

  if (grow) {
    newSx.flexGrow = grow === true ? 1 : grow
  }

  if (strong) {
    newSx.padding = "2px 8px"
    newSx.backgroundColor = "background.strong"
    newSx.borderRadius = 1
    newSx.cursor = "pointer"
  }

  const renderBox = <MUIBox ref={ref} sx={{ ...newSx, ...sx }} {...other} />

  if (help) {
    const props = { arrow: true, disableInteractive: true, ...help }
    return <Tooltip {...props}>{renderBox}</Tooltip>
  }

  return renderBox
})

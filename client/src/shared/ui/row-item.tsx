import { Box, BoxProps } from "shared/ui/box"
import { AlertColor, alpha } from "@mui/material"
import { styled } from "@mui/material/styles"

interface RowItemPropsV2 extends BoxProps {
  color?: AlertColor | "primary" | "secondary"
  bgColor?: AlertColor | "primary" | "secondary"
  disableMargin?: boolean
  eachRadius?: boolean
  height?: number
}

export const RowItem = styled((props: RowItemPropsV2) => {
  const {
    color,
    bgColor,
    disableMargin,
    eachRadius,
    height,
    ...other
  } = props

  return <Box {...other} />
})((props) => {
  const {
    color,
    bgColor,
    disableMargin,
    height,
    eachRadius = true,
    theme: {
      palette,
      background,
    },
  } = props

  return {
    border: `1px solid ${palette.mode === "dark"
      ? alpha(palette.grey["600"], 0.75)
      : alpha(palette.grey["400"], 0.45)}`,

    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
    marginBottom: disableMargin ? 0 : 4,
    borderRadius: eachRadius ? 8 : 0,
    transition: ".3s",
    backgroundSize: "6px 6px",
    minHeight: height ?? 40,

    "&:last-child": {
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
    },

    "&:first-of-type": {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },

    borderLeft: color && `5px solid ${palette[color].main}`,
    backgroundImage: bgColor && (background.hatch as any)[bgColor],

    "&:hover": {
      backgroundColor: palette.grey[palette.mode === "dark" ? 800 : 100],
    },
  }
})

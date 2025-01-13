import { AlertColor, alpha, Theme } from "@mui/material"
import { styled } from "@mui/material/styles"
import { isString } from "shared/lib/utils"
import { Box, BoxProps } from "shared/ui/box"

type Colors = AlertColor | "primary" | "secondary"

export interface RowItemProps extends Omit<BoxProps, "color"> {
  color?: Colors | boolean
  bgColor?: Colors | boolean
  disableMargin?: boolean
  eachRadius?: boolean
  height?: number
}

export const RowItem = styled((props: RowItemProps) => {
  const {
    color,
    bgColor,
    disableMargin,
    eachRadius,
    height,
    ...other
  } = props

  return <Box {...other} />
// @ts-ignore
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

  const omitColor = (color: unknown): color is Colors => isString(color)

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

    borderLeft: omitColor(color) && `5px solid ${palette[color].main}`,
    backgroundImage: omitColor(bgColor) && (background.hatch as any)[bgColor],

    "&:hover": {
      backgroundColor: palette.grey[palette.mode === "dark" ? 800 : 100],
    },
  }
})

const getThemeColor = (theme: Theme, colorType: "success" | "error" | "primary" | "warning") => {
  const { palette } = theme

  return palette.mode === "light" ? palette[colorType].light : palette[colorType].dark
}

const getBorderStyle = (color: string, width = 5) => `${width}px solid ${color}`

export type StyledRowItemProps = RowItemProps & {
  active?: boolean
  borderSuccess?: boolean
  borderError?: boolean
  bgError?: boolean
}

export const StyledRowItem = styled(({
  active,
  borderError,
  borderSuccess,
  bgError,
  ...props
}: StyledRowItemProps) => (
  <RowItem {...props} />
))(({
  theme, active, bgError, borderSuccess, borderError,
}) => {
  const successColor = getThemeColor(theme, "success")
  const errorColor = getThemeColor(theme, "error")
  const activeColor = getThemeColor(theme, active ? "primary" : "warning")

  return {
    ...(borderSuccess && {
      borderLeft: getBorderStyle(successColor),
    }),

    ...(borderError && {
      borderLeft: getBorderStyle(errorColor),
    }),

    ...(bgError && {
      background: theme.background.hatch.error,
      backgroundSize: "6px 6px",
    }),

    ...(active && {
      border: `1px solid ${activeColor}`,
      ...(borderSuccess && {
        borderLeft: `${getBorderStyle(activeColor)} !important`,
      }),

      ...(bgError && {
        border: `${getBorderStyle(getThemeColor(theme, "error"), 1)}`,
        borderLeft: `${getBorderStyle(getThemeColor(theme, "error"))} !important`,
      }),
    }),
  }
})

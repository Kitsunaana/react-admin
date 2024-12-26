import { styled } from "@mui/material/styles"
import { RowItem, RowItemProps } from "shared/ui/row-item"

import { Theme } from "@mui/material"

const getThemeColor = (theme: Theme, colorType: "success" | "error" | "primary" | "warning") => {
  const { palette } = theme

  return palette.mode === "light" ? palette[colorType].light : palette[colorType].dark
}

const getBorderStyle = (color: string) => `5px solid ${color}`

export const StyledRowItem = styled(({
  active,
  borderError,
  borderSuccess,
  bgError,
  ...props
}: RowItemProps & {
  active?: boolean
  borderSuccess?: boolean
  borderError?: boolean
  bgError?: boolean
}) => (
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
        border: `1px solid ${getThemeColor(theme, "error")}`,
        borderLeft: `${getBorderStyle(getThemeColor(theme, "error"))} !important`,
      }),
    }),
  }
})

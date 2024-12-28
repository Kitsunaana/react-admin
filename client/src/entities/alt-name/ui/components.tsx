import { alpha, styled } from "@mui/material"
import { RowItem, RowItemProps } from "shared/ui/row-item"

interface StyledAltNameItemProps extends RowItemProps {
  disabled: boolean
  active: boolean
}

export const StyledAltNameItem = styled(
  ({ disabled, active, ...other }: StyledAltNameItemProps) => <RowItem {...other} />,
)(({ theme: { palette }, disabled, active }) => ({
  ...(disabled ? {
    position: "relative",
    "&::after": {
      position: "absolute",
      content: "''",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      borderRadius: 2,
      background: alpha(palette.common[
        palette.mode === "light" ? "black" : "white"
      ], 0.15),
    },
  } : {}),
  ...(active ? {
    border: (
      `1px solid ${palette.mode === "light" ? palette.primary.light : palette.warning.dark}`
    ),
  } : {}),
}))

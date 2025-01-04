import { alpha, styled } from "@mui/material"
import { StyledRowItem, StyledRowItemProps } from "shared/ui/row-item"

type StyledAltNameItemProps = StyledRowItemProps & {
  disabled: boolean
}

export const StyledAltNameItem = styled(
  ({ disabled, active, ...other }: StyledAltNameItemProps) => <StyledRowItem {...other} />,
)(({ theme: { palette }, disabled }) => ({
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
}))

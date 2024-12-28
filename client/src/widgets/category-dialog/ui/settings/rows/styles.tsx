import { styled } from "@mui/material/styles"
import { Divider as BaseDivider } from "shared/ui/divider"
import { Text } from "shared/ui/text"

export const Divider = styled(BaseDivider)(() => ({
  fontSize: 12,
  textTransform: "uppercase",
}))

export const Caption = styled(Text)(() => ({
  margin: "4px 0px",
}))

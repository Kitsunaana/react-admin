import { styled } from "@mui/material/styles"
import { FormGroup } from "@mui/material"
import { Text } from "shared/ui/text"

export const Container = styled(FormGroup)(() => ({
  margin: "0px 8px",
}))

export const Caption = styled(Text)(() => ({
  maxWidth: 250,
}))

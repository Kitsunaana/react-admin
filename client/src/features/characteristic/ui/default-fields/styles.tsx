import { styled } from "@mui/material/styles"
import { FormControlLabel as MUIFormControlLabel } from "@mui/material"

export const FormControlLabel = styled(MUIFormControlLabel)(() => ({
  alignSelf: "start",
  marginLeft: 0,
  display: "flex",
  gap: 4,
}))

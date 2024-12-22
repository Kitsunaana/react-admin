import { styled } from "@mui/material/styles"
import Autocomplete from "@mui/material/Autocomplete"

export const FormBottom = styled("div")(() => ({
  display: "flex",
  gap: 8,
  width: "100%",
}))

export const IconSelect = styled(Autocomplete)(() => ({
  width: "70%",
}))

import { styled } from "@mui/material/styles"
import { Box } from "shared/ui/box"

export const CharacteristicsContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  marginTop: 8,
  overflow: "auto",
}))

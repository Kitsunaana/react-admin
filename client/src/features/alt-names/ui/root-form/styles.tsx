import { styled } from "@mui/material/styles"

// <Box flex gap sx={{ height: 1, pt: 1 }}>
export const Root = styled("form")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  paddingTop: 8,
}))

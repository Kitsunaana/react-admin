import { styled } from "@mui/material/styles"

export const Container = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  height: "100%",
}))

export const Actions = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: 8,
}))
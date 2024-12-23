import { styled } from "@mui/material/styles"

export const CheckboxContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  position: "absolute",
  width: "100%",
  height: 250,
  top: 0,
  right: 0,
  padding: 8,
}))

export const ActivePhotoContainer = styled("div")(() => ({
  position: "relative",
  width: "100%",
  height: 250,
}))

export const Container = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
}))

import { styled } from "@mui/material/styles"
import { Drawer } from "@mui/material"

export const Container = styled(Drawer)(() => ({
  zIndex: 10000,
}))

export const EventListContainer = styled("div")(() => ({
  overflow: "auto",
}))

export const ActionsContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  margin: "auto 8px 0px 8px",
}))

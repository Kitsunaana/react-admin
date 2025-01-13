import { styled } from "@mui/material/styles"
import { RowItem } from "shared/ui/row-item"

export const Row = styled(RowItem)(() => ({
  marginTop: 8,
}))

export const Container = styled("div")(() => ({
  display: "flex",
  gap: 8,
  alignItems: "center",
}))

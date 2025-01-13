import { styled } from "@mui/material/styles"
import { Input } from "shared/ui/form/input"

export const Description = styled(Input)(() => ({
  "& .MuiInputBase-root": {
    padding: 4,
  },
}))

export const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  marginTop: 8,
}))

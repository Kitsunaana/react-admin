import { styled } from "@mui/material/styles"
import { IconButton } from "shared/ui/buttons/icon-button"

export const Button = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary[theme.palette.mode === "dark" ? "main" : "light"],
}))

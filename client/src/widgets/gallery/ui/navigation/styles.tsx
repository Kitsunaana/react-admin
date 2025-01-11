import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"

export const Container = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "black" : "white",
  boxShadow: theme.shadows[8],
  backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))",
  borderRadius: 12,
  padding: 6,
  display: "inline-flex",
  position: "absolute",
  bottom: 10,
  left: "50%",
  transform: "translate(-50%, 0)",
  zIndex: 33,
  gap: 6,
}))

export const NavigationButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary[theme.palette.mode === "dark" ? "dark" : "light"],
  minWidth: 0,
  padding: 8,
  borderRadius: 8,
}))

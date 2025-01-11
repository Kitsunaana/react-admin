import { styled } from "@mui/material/styles"

export const Container = styled("div")(({ theme }) => ({
  width: 492,
  overflow: "hidden",
  position: "relative",
  margin: "0 auto",
  zIndex: 45,
  borderRadius: 8,
  boxShadow: theme.shadows[4],
  backgroundColor: theme.palette.common[theme.palette.mode === "dark" ? "black" : "white"],
  backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))",
}))

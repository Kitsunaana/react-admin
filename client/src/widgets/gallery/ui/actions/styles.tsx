import { styled } from "@mui/material/styles"

export const Container = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: 4,
  backgroundColor: theme.palette.common[theme.palette.mode === "dark" ? "black" : "white"],
  boxShadow: theme.shadows[8],
  backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))",
  position: "absolute",
  padding: 2,
  borderRadius: 8,
  bottom: 0,
  right: 0,
  zIndex: 35,
}))

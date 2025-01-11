import { styled } from "@mui/material/styles"

export const CounterImage = styled("div")(() => ({
  height: "calc(100% - 10px)",
  position: "absolute",
  zIndex: 33,
  width: 154,
  backgroundColor: "rgba(0,0,0,.7)",
  left: "50%",
  top: 5,
  transform: "translate(-50%, 0)",
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontSize: 24,
  userSelect: "none",
}))

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


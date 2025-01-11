import { Image } from "shared/ui/image"
import { styled } from "@mui/material/styles"
import { ButtonBase } from "@mui/material"

export const PreviewPhoto = styled(Image)(() => ({
  display: "block",
  height: 80,
  width: "100%",
  objectFit: "cover",
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

export const PhotosWrapper = styled("div")(() => ({
  position: "relative",
  left: 164,
  display: "flex",
  whiteSpace: "nowrap",
  transition: "transform 0.5s ease-in-out",
}))

export const PhotoButton = styled(ButtonBase)(() => ({
  minWidth: 154,
  margin: 5,
  display: "inline-block",
  height: 80,
  backgroundColor: "#97a9b2",
  borderRadius: 8,
  overflow: "hidden",
}))

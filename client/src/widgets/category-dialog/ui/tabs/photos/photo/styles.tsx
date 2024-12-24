import { alpha, styled } from "@mui/material/styles"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Image } from "shared/ui/image"
import { Text } from "shared/ui/text"

export const ImageContainer = styled("div")(() => ({
  position: "relative",
  height: 170,
  overflow: "hidden",
}))

export const ImageHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "absolute",
  right: 0,
  left: 0,
  padding: "4px 8px",
  zIndex: 30,
  backgroundColor: alpha(theme.palette.grey["900"], 0.85),
  color: "white",
}))

export const Filename = styled(Text)(() => ({
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  width: "100%",
}))

export const DeleteImageButton = styled(IconButton)(() => ({
  padding: 4,
  minWidth: "unset",
  borderRadius: "50%",
  color: "white",
}))

export const StyledPhoto = styled(Image)(() => ({
  transition: ".2s",
  width: "100%",
  height: 170,
  objectFit: "contain",
}))

import { Image, ImageProps } from "shared/ui/image"
import { styled } from "@mui/material/styles"

type CustomImageProps = ImageProps & {
  scale: number,
  rotate: number
}

export const ViewPhoto = styled(
  ({ scale, rotate, ...other }: CustomImageProps) => <Image {...other} />,
)(({ scale, rotate }) => ({
  userSelect: "none",
  position: "absolute",
  display: "none",
  objectFit: "cover",
  zIndex: 2,
  borderRadius: 12,
  opacity: 0,
  transition: "opacity 0.5s, transform 0.3s",
  maxHeight: "calc(100% - 248px)",
  maxWidth: 1000,
  top: "50%",
  left: "50%",
  transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`,

  "&[data-active=true]": {
    display: "block",
    opacity: 1,
    zIndex: 30,
  },

  "&[data-active=prepared]": {
    display: "block",
  },
}))

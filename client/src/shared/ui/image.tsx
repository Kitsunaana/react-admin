import { alpha, CircularProgress } from "@mui/material"
import { styled } from "@mui/material/styles"
import {
  DetailedHTMLProps, ImgHTMLAttributes, useState,
} from "react"
import { Box } from "shared/ui/box"

const ImageLoader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  zIndex: 30,
  width: "100%",
  height: "100%",
  backgroundColor: alpha(theme.palette.common.black, 0.1),
}))

interface ImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>{
  src: string
  className?: string
}

export const Image = (props: ImageProps) => {
  const { src, className, ...other } = props

  const [loading, setLoading] = useState(true)

  const handleImageLoad = () => setLoading(false)

  return (
    <>
      {loading && (
        <ImageLoader>
          <CircularProgress />
        </ImageLoader>
      )}
      <img
        onLoad={handleImageLoad}
        className={className}
        src={src}
        alt=""
        {...other}
      />
    </>
  )
}

import { alpha, CircularProgress } from "@mui/material"
import { styled } from "@mui/material/styles"
import { ImgHTMLAttributes, useState } from "react"
import { Box } from "shared/ui/box"
import { useImage } from "shared/hooks/use-image"

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

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src?: string
  data?: string | File
  className?: string
}

export const Image = ({
  src,
  data,
  className,
  ...other
}: ImageProps) => {
  const [loading, setLoading] = useState(true)

  const path = useImage(data ?? src)

  const handleImageLoad = () => setLoading(false)

  if (!path) return null

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
        src={path}
        alt=""
        {...other}
      />
    </>
  )
}

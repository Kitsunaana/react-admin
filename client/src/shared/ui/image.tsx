import {
  DetailedHTMLProps, ImgHTMLAttributes, useState,
} from "react"
import { Box, BoxProps } from "shared/ui/box"
import { alpha, useTheme } from "@mui/material"
import { blue } from "@mui/material/colors"
import styled from "styled-components"
import { IconLoader } from "shared/ui/icon-loader"

const ImageLoader = styled(Box)<BoxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 30;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => alpha(theme.palette.common.black, 0.5)};
`

interface ImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>{
  src: string
  className?: string
}

export const Image = (props: ImageProps) => {
  const { src, className } = props

  const theme = useTheme()
  const [loading, setLoading] = useState(true)

  const handleImageLoad = () => {
    setLoading(false)
  }

  return (
    <Box className={className}>
      {loading && (
        <ImageLoader theme={theme}>
          <IconLoader
            color={blue[400]}
            fontSize={45}
          />
        </ImageLoader>
      )}
      <img
        onLoad={handleImageLoad}
        className="custom__img"
        src={src}
        alt=""
      />
    </Box>
  )
}

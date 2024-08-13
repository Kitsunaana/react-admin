import {
  DetailedHTMLProps, ImgHTMLAttributes, useState,
} from "react"
import { Box, BoxProps } from "shared/ui/box"
import { alpha, CircularProgress, useTheme } from "@mui/material"
import styled from "styled-components"

const ImageLoader = styled(Box)<BoxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 30;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => alpha(theme.palette.common.black, 0.1)};
`

interface ImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>{
  src: string
  className?: string
}

export const Image = (props: ImageProps) => {
  const { src, className, ...other } = props

  const theme = useTheme()
  const [loading, setLoading] = useState(true)

  const handleImageLoad = () => {
    setLoading(false)
  }

  return (
    <>
      {loading && (
        <ImageLoader theme={theme}>
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

import { DetailedHTMLProps, ImgHTMLAttributes } from "react"
import { useImage } from "shared/hooks/use-image"
import { Image as BaseImage } from "shared/ui/image"
import styled from "styled-components"

const CustomImage = styled(BaseImage)`
  display: block;
  height: 80px;
  width: 100%;
  object-fit: cover;
`

interface ImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>{
  caption: string
  path?: string
  file?: File
}

export const Image = (props: ImageProps) => {
  const {
    caption, path, file,
  } = props

  const src = useImage(path ?? file)

  return (
    <CustomImage
      src={src}
      alt={caption}
    />
  )
}

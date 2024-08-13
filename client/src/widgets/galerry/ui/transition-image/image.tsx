import { DetailedHTMLProps, ImgHTMLAttributes } from "react"
import styled from "styled-components"
import { observer } from "mobx-react-lite"
import { useImage } from "shared/hooks/use-image"
import { galleryStore } from "widgets/galerry/model/gallery-store"
import { Image as ImageBase } from "shared/ui/image"

interface CustomImageProps extends
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
{
  transform: {
    scale: number,
    rotate: number
  }
}

const CustomImage = styled(ImageBase)<CustomImageProps>`
    user-select: none;
    position: absolute;
    display: none;
    object-fit: cover;
    z-index: 2;
    border-radius: 12px;
    opacity: 0;
    transition: opacity 0.5s, transform 0.3s;
    max-height: calc(100% - 248px);
    max-width: 1000px;
    top: 50%;
    left: 50%;
    transform: ${({ transform }) => (
    `translate(-50%, -50%) scale(${transform.scale}) rotate(${transform.rotate}deg)`
  )};

    &[data-active=true] {
      display: block;
      opacity: 1;
      z-index: 30;
    }

    &[data-active=prepared] {
      display: block;
    }
`

interface ImageComponentProps extends
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
{
  file?: File
  caption: string
  path?: string
}

export const Image = observer((props:ImageComponentProps) => {
  const {
    path, file, caption, ...other
  } = props

  const src = useImage(path ?? file)
  const transform = {
    scale: galleryStore.scale,
    rotate: galleryStore.rotate,
  }

  return (
    <CustomImage
      transform={transform}
      src={src}
      alt={caption}
      {...other}
    />
  )
})

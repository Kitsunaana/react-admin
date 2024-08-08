import { Image, Media } from "widgets/galerry/types"
import {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  MutableRefObject, useEffect, useLayoutEffect, useMemo, useRef, useState,
} from "react"
import { Box } from "shared/ui/box"
import styled from "styled-components"
import { useImage } from "widgets/galerry/model/use-image"

const TransitionImageContainer = styled(Box)`
  position: relative;
  width: 750px;
  height: 450px;
  padding-bottom: 50%;
  background-color: #97a9b2;
  border-radius: 12px;
`

const CustomImage = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  display: none;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.5s;
  
  &[data-active=true] {
    display: block;
    opacity: 1;
    z-index: 30;
  }
  
  &[data-active=prepared] {
    display: block;
  }
`

interface TransitionImageProps {
  images: (Media | Image)[]
  indexActiveImage: number
}

type RefT = MutableRefObject<HTMLDivElement | null>

const getPhotoByRef = (ref: RefT, index: number): HTMLElement | null => (
  ref.current!.querySelector(`img:nth-of-type(${index + 1})`)
)

const hidePhoto = (element: HTMLElement | null) => {
  if (!element) return

  element.dataset.active = "false"
  if (element.previousSibling) {
    // @ts-ignore
    element.previousSibling.dataset.active = "false"
  }

  if (element.nextSibling) {
    // @ts-ignore
    element.nextSibling.dataset.active = "false"
  }
}

const showPhoto = (element: HTMLElement | null) => {
  if (!element) return

  element.dataset.active = "true"
  if (element.previousSibling) {
    // @ts-ignore
    element.previousSibling.dataset.active = "prepared"
  }

  if (element.nextSibling) {
    // @ts-ignore
    element.nextSibling.dataset.active = "prepared"
  }
}

interface ImageComponentProps extends
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
{
  file?: File
  caption: string
  path?: string
}

export const ImageComponent = (props: ImageComponentProps) => {
  const {
    path, file, caption, ...other
  } = props

  const src = useImage(path ?? file)

  return (
    <CustomImage
      src={src}
      alt={caption}
      {...other}
    />
  )
}

export const TransitionImage = (props: TransitionImageProps) => {
  const { images, indexActiveImage } = props

  const [prevActiveIndexImage, setPrevActiveIndexImage] = useState(indexActiveImage)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!containerRef.current) return

    const activePhoto = getPhotoByRef(containerRef, prevActiveIndexImage)
    const nextActivePhoto = getPhotoByRef(containerRef, indexActiveImage)

    if (prevActiveIndexImage !== indexActiveImage) {
      hidePhoto(activePhoto)
      showPhoto(nextActivePhoto)
    } else {
      showPhoto(activePhoto)
    }

    setPrevActiveIndexImage(indexActiveImage)
  }, [indexActiveImage])

  return useMemo(() => (
    <TransitionImageContainer ref={containerRef}>
      {images.map((image) => {
        if (!image) return null

        if (image.filename) {
          return (
            <ImageComponent
              caption={image.filename}
              key={image.id}
              path={`http://localhost:3333/${image.path}`}
              data-active={image.id === prevActiveIndexImage}
            />
          )
        }

        if (image.caption) {
          return (
            <ImageComponent
              caption={image.caption}
              key={image.id}
              data-active={image.id === String(prevActiveIndexImage)}
              file={image.data}
            />
          )
        }
        return null
      })}
    </TransitionImageContainer>
  ), [])
}

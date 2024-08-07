import { Image } from "widgets/galerry/types"
import {
  MutableRefObject, useLayoutEffect, useMemo, useRef, useState,
} from "react"
import { Box } from "shared/ui/box"
import styled from "styled-components"

interface TransitionImageProps {
  images: Image[]
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
      {images.map((image) => (
        <CustomImage
          key={image.id}
          src={`http://localhost:3333/${image.path}`}
          alt={image.caption}
          loading="lazy"
          data-active={image.id === prevActiveIndexImage}
        />
      ))}
    </TransitionImageContainer>
  ), [])
}

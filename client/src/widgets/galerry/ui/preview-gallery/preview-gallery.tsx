import {
  useEffect, useMemo, useRef,
} from "react"
import { Box, BoxProps } from "shared/ui/box"
import {
  ButtonBase, ButtonBaseProps, useTheme,
} from "@mui/material"
import { galleryStore } from "widgets/galerry/model/gallery-store"
import { observer } from "mobx-react-lite"
import { Image } from "widgets/galerry/ui/preview-gallery/image"
import styled from "styled-components"

const PreviewGalleryContainer = styled(Box)<BoxProps>`
  width: 492px;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  z-index: 45;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows[4]};
`

const ButtonBox = styled(Box)<BoxProps>`
  position: relative;
  left: 164px;
  display: flex;
  white-space: nowrap;
  transition: transform 0.5s ease-in-out;
`

const ButtonImage = styled(ButtonBase)<ButtonBaseProps>`
  min-width: 154px;
  margin: 5px;
  display: inline-block;
  height: 80px;
  background-color: #97a9b2;
  border-radius: 8px;
  overflow: hidden;
`

const Counter = styled(Box)<BoxProps>`
  height: calc(100% - 10px);
  position: absolute;
  z-index: 33;
  width: 154px;
  background-color: rgba(0,0,0,.7);
  left: 50%;
  top: 5px;
  transform: translate(-50%, 0);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  user-select: none;
`

export const PreviewGallery = observer(() => {
  const { indexActiveImage, setIndexActiveImage, images } = galleryStore

  const theme = useTheme()
  const previewContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!previewContainerRef.current) return

    previewContainerRef.current.style.transform = (
      `translate3d(-${indexActiveImage * 164}px, 0, 0)`
    )
  }, [indexActiveImage])

  const counterImage = `${indexActiveImage + 1}/${images.length}`

  const imageRender = (image: typeof images[0]) => {
    if (image.caption) {
      return <Image caption={image.caption} file={image.data} />
    }

    if (image.filename) {
      return <Image caption={image.filename} path={image.path} />
    }

    return null
  }

  return (
    <PreviewGalleryContainer theme={theme}>
      {useMemo(() => (
        <ButtonBox ref={previewContainerRef}>
          {images.map((image, index) => (
            <ButtonImage
              key={image.id}
              onClick={() => setIndexActiveImage(index)}
            >
              {imageRender(image)}
            </ButtonImage>
          ))}
        </ButtonBox>
      ), [])}
      <Counter>{counterImage}</Counter>
    </PreviewGalleryContainer>
  )
})
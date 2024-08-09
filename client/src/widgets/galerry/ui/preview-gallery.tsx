import { Image, Media } from "widgets/galerry/types"
import {
  Dispatch, SetStateAction, useEffect, useMemo, useRef,
} from "react"
import { Box } from "shared/ui/box"
import { alpha, ButtonBase } from "@mui/material"
import { useImage } from "widgets/galerry/model/use-image"

interface CustomImageProps {
  caption: string
  path?: string
  file?: File
}

export const CustomImage = (props: CustomImageProps) => {
  const { caption, path, file } = props

  const src = useImage(path ?? file)

  return (
    <img
      src={src}
      alt={caption}
      style={{
        display: "block",
        height: 80,
        width: "100%",
        borderRadius: 1,
        objectFit: "cover",
      }}
    />
  )
}

interface PreviewGalleryProps {
  activeImageIndex: number
  images: Array<Media | Image>
  setNextPhoto: Dispatch<SetStateAction<number>>
}

export const PreviewGallery = (props: PreviewGalleryProps) => {
  const { activeImageIndex, images, setNextPhoto } = props

  const previewContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!previewContainerRef.current) return

    previewContainerRef.current.style.transform = `translate3d(-${activeImageIndex * 164}px, 0, 0)`
  }, [activeImageIndex])

  return (
    <Box
      sx={{
        width: 492,
        overflow: "hidden",
        position: "relative",
        margin: "0 auto",
        zIndex: 45,
        boxShadow: ({ shadows }) => shadows[4],
        borderRadius: 1,
      }}
    >
      {useMemo(() => (
        <Box
          ref={previewContainerRef}
          sx={{
            position: "relative",
            left: 164,
            display: "flex",
            whiteSpace: "nowrap",
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {images.map((image, index) => (
            <Box key={image.id}>
              <ButtonBase
                onClick={() => setNextPhoto(index)}
                sx={{
                  minWidth: 154,
                  margin: "5px",
                  display: "inline-block",
                  height: 80,
                  backgroundColor: "#97a9b2",
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                {image.caption ? (
                  <CustomImage
                    caption={image.caption}
                    file={image.data}
                  />
                ) : (
                  <CustomImage
                    caption={image.filename ?? ""}
                    path={`http://localhost:3333/${image.path}`}
                  />
                )}
              </ButtonBase>
            </Box>
          ))}
        </Box>
      ), [])}
      <Box
        sx={{
          height: "calc(100% - 10px)",
          position: "absolute",
          zIndex: 33,
          width: 154,
          backgroundColor: "rgba(0,0,0,.7)",
          left: "50%",
          top: 5,
          transform: "translate(-50%, 0)",
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 24,
          userSelect: "none",
        }}
      >
        {activeImageIndex + 1}
        /
        {images.length}
      </Box>
    </Box>
  )
}

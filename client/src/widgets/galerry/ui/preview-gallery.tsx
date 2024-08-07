import { Image } from "widgets/galerry/types"
import {
  Dispatch, SetStateAction, useEffect, useMemo, useRef,
} from "react"
import { Box } from "shared/ui/box"
import { ButtonBase } from "@mui/material"

interface PreviewGalleryProps {
  activeImageIndex: number
  images: Image[]
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
                <img
                  src={`http://localhost:3333/${image.path}`}
                  alt={image.caption}
                  style={{
                    display: "block",
                    height: 80,
                    width: "100%",
                    borderRadius: 1,
                    objectFit: "cover",
                  }}
                />
              </ButtonBase>
            </Box>
          ))}
        </Box>
      ), [])}
      <Box
        sx={{
          height: 1,
          position: "absolute",
          zIndex: 33,
          width: 164,
          backgroundColor: "rgba(255,255,255,.7)",
          left: "50%",
          top: 0,
          transform: "translate(-50%, 0)",
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
          fontSize: 24,
        }}
      >
        {activeImageIndex + 1}
        /
        {images.length}
      </Box>
    </Box>
  )
}

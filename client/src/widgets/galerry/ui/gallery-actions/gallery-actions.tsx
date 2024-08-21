import { observer } from "mobx-react-lite"
import { Box, BoxProps } from "shared/ui/box"
import { IconButtonBase } from "shared/ui/buttons/icon-button-base"
import { galleryStore } from "widgets/galerry/model/gallery-store"
import styled from "styled-components"
import { useTheme } from "@mui/material"
import { ZoomInScale } from "widgets/galerry/ui/gallery-actions/zoom-in-scale"
import { ZoomOutScale } from "widgets/galerry/ui/gallery-actions/zoom-out-scale"

const GalleryActionsContainer = styled(Box)<BoxProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 4px;
  background-color: ${({ theme: { palette } }) => palette.common[palette.mode === "dark" ? "black" : "white"]};
  background-image: linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16));
  box-shadow: ${({ theme }) => theme.shadows[8]};
  position: absolute;
  padding: 2px;
  border-radius: 8px;
  bottom: 0;
  right: 0;
  z-index: 35;
`

export const GalleryActions = observer(() => {
  const theme = useTheme()

  const { updateRotate, setDefaultParameters, closeGallery } = galleryStore

  return (
    <GalleryActionsContainer theme={theme}>
      <ZoomInScale />
      <ZoomOutScale />
      <IconButtonBase
        fontSize={35}
        onClick={() => updateRotate("right")}
        name="rotateRight"
      />
      <IconButtonBase
        fontSize={35}
        onClick={() => updateRotate("left")}
        name="rotateLeft"
      />
      <IconButtonBase
        fontSize={35}
        name="setDefaultParameters"
        onClick={setDefaultParameters}
      />
      <IconButtonBase
        fontSize={35}
        name="clear"
        onClick={() => {
          setDefaultParameters()
          closeGallery()
        }}
      />
    </GalleryActionsContainer>
  )
})

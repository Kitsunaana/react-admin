import { Box } from "shared/ui/box"
import { Checkbox, FormControlLabel, Slider } from "@mui/material"
import { forwardRef } from "react"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import { IconButtonBase } from "shared/ui/buttons/icon-button-base"
import { MuiColorInput, MuiColorInputProps } from "mui-color-input"
import { TPosition } from "features/categories/create-and-edit/model/types"
import { Image } from "shared/ui/image"
import { useImage } from "shared/hooks/use-image"
import { observer } from "mobx-react-lite"
import { useStores } from "features/categories/create-and-edit/ui/dialog"
import { ColorInput } from "shared/ui/form/input-color"

type TPositionCheckbox = {
  id: number
  content: string
  position: TPosition
}

const gridCheckbox: Array<Array<TPositionCheckbox>> = [
  [
    { content: "flex-start", position: "top-left", id: 1 },
    { content: "center", position: "top-center", id: 2 },
    { content: "flex-end", position: "top-right", id: 3 },
  ],
  [
    { content: "flex-start", position: "center-left", id: 4 },
    { content: "center", position: "center-center", id: 5 },
    { content: "flex-end", position: "center-right", id: 6 },
  ],
  [
    { content: "flex-start", position: "bottom-left", id: 7 },
    { content: "center", position: "bottom-center", id: 8 },
    { content: "flex-end", position: "bottom-right", id: 9 },
  ],
]

interface CustomImageProps {
  path?: string
  data?: File
  caption: string
}

export const CustomImage = (props: CustomImageProps) => {
  const { path, caption, data } = props

  const src = useImage(path ?? data)

  return (
    <Image
      style={{
        width: "100%",
        height: "250px",
        objectFit: "cover",
        borderRadius: 8,
      }}
      src={src}
      alt={caption}
    />
  )
}

export const CustomizeCaption = observer(() => {
  const { photoPosition } = useStores()

  return (
    <Text
      caption="caption"
      sx={{
        fontSize: 20,
        lineHeight: 1.5,
        color: photoPosition.color,
        whiteSpace: "pre-line",
        padding: "4px 8px",
        background: photoPosition.bgColor,
        borderRadius: "8px",
        boxShadow: "rgba(255, 255, 255, 0.25) 0px 4px 30px",
        backdropFilter: `blur(${photoPosition.blur}px)`,
        border: "1px solid rgba(255, 255, 255, 0.12)",
      }}
    />
  )
})

export const CheckBoxGrid = observer(() => {
  const { photoPosition } = useStores()

  return (
    <>
      {gridCheckbox.map((row, index) => (
        <Box key={index} flex ai row jc_sp>
          {row.map((checkbox) => (
            <Box
              flex
              row
              key={checkbox.id}
              sx={{ flexBasis: "33.33%", justifyContent: checkbox.content }}
            >
              {photoPosition.captionPosition === checkbox.position ? (
                <CustomizeCaption />
              ) : (
                <Checkbox
                  onChange={() => photoPosition.changeCaptionPosition(checkbox.position)}
                />
              )}
            </Box>
          ))}
        </Box>
      ))}
    </>
  )
})

export const Gallery = observer(() => {
  const { photoPosition } = useStores()

  const renderImage = () => {
    const image = photoPosition.activeImage
    if (!image) return null

    const props = {
      ...image,
      caption: image.originalName ?? image.caption,
    }

    return <CustomImage {...props} />
  }

  return (
    <Box flex row ai>
      {photoPosition.isShowButton && (
        <IconButtonBase name="prev" onClick={photoPosition.setPrevImage} />
      )}
      <Box sx={{ position: "relative", width: 1, height: 250 }}>
        <Box
          flex
          jc_sp
          sx={{
            position: "absolute", width: 1, height: 250, top: 0, right: 0, p: 1,
          }}
        >
          <CheckBoxGrid />
        </Box>
        {renderImage()}
      </Box>
      {photoPosition.isShowButton && (
        <IconButtonBase name="next" onClick={photoPosition.setNextImage} />
      )}
    </Box>
  )
})

export const ChangeTextColor = observer(() => {
  const { photoPosition } = useStores()

  return (
    <ColorInput
      onChange={photoPosition.changeColor}
      value={photoPosition.color}
      fullWidth
      label="Цвет текста"
    />
  )
})

export const ChangeBgColor = observer(() => {
  const { photoPosition } = useStores()

  return (
    <ColorInput
      onChange={photoPosition.changeBgColor}
      value={photoPosition.bgColor}
      fullWidth
      label="Цвет фона для текста"
    />
  )
})

export const ChangeBlur = observer(() => {
  const { photoPosition } = useStores()

  return (
    <Slider
      onChange={(event, value) => {
        photoPosition.changeBlur(Array.isArray(value) ? 0 : value)
      }}
      value={photoPosition.blur}
      valueLabelDisplay="auto"
      defaultValue={5}
      max={20}
      marks={[{ value: 10, label: <Icon name="zoomEffect" fontSize="small" /> }]}
    />
  )
})

export const CheckboxShowPhoto = observer(() => {
  const { photoPosition } = useStores()

  return (
    <FormControlLabel
      control={(
        <Checkbox
          onChange={photoPosition.changeShowPhoto}
          checked={photoPosition.isShowPhotoWithGoods}
        />
      )}
      label="Показывать фото в списке с товарами как раздел"
    />
  )
})

export const PhotoPosition = () => (
  <Box sx={{ mt: 1 }}>
    <CheckboxShowPhoto />
    <Box flex ai row jc_sp gap>
      <ChangeBgColor />
      <ChangeTextColor />
      <Box sx={{ width: 1 }}>
        <Text caption="Эффект стекла фона" />
        <Box sx={{ px: 1 }}>
          <ChangeBlur />
        </Box>
      </Box>
    </Box>

    <Text sx={{ mb: 1 }} caption="Позиционирование в контейнере" />
    <Gallery />
  </Box>
)

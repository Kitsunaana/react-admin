import { Box } from "shared/ui/box"
import {
  Checkbox, FormControlLabel, Slider,
} from "@mui/material"
import {
  forwardRef,
} from "react"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import { IconButton } from "shared/ui/icon-button"
import {
  Controller,
} from "react-hook-form"
import { MuiColorInput, MuiColorInputProps } from "mui-color-input"
import {
  TPosition,
} from "features/categories/create-and-edit/model/types"
import { Image } from "shared/ui/image"
import { useImage } from "shared/hooks/use-image"
import { observer } from "mobx-react-lite"
import { rootStore } from "features/categories/create-and-edit/model/stores/dialog-store"

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

type ColorInputProps = {} & MuiColorInputProps

const ColorInput = forwardRef<HTMLDivElement, ColorInputProps>((props, ref) => {
  const { sx } = props

  return (
    <MuiColorInput
      ref={ref}
      PopoverProps={{
        anchorOrigin: {
          vertical: "top",
          horizontal: "left",
        },
        transformOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
      }}
      isAlphaHidden={false}
      format="rgb"
      size="small"
      sx={{
        "& .MuiInputBase-root": {
          borderRadius: 2,
          pl: 1,
        },
        "& .MuiInputBase-input": {
          padding: "8.5px 5px",
          height: 18,
        },
        "& .MuiColorInput-Button": {
          height: 16,
          width: 24,
          p: 0,
        },
        ...sx,
      }}
      {...props}
    />
  )
})

interface CustomImageProps {
  path?: string
  data?: File
  caption: string
}

const { photoPosition: photoPositionStore } = rootStore

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

export const CustomizeCaption = observer(() => (
  <Text
    caption="caption"
    sx={{
      fontSize: 20,
      lineHeight: 1.5,
      color: photoPositionStore.color,
      whiteSpace: "pre-line",
      padding: "4px 8px",
      background: photoPositionStore.bgColor,
      borderRadius: "8px",
      boxShadow: "rgba(255, 255, 255, 0.25) 0px 4px 30px",
      backdropFilter: `blur(${photoPositionStore.blur}px)`,
      border: "1px solid rgba(255, 255, 255, 0.12)",
    }}
  />
))

export const CheckBoxGrid = observer(() => (
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
            {photoPositionStore.captionPosition === checkbox.position ? (
              <CustomizeCaption />
            ) : (
              <Checkbox
                onChange={() => photoPositionStore.changeCaptionPosition(checkbox.position)}
              />
            )}
          </Box>
        ))}
      </Box>
    ))}
  </>
))

export const Gallery = observer(() => {
  const renderImage = () => {
    const image = photoPositionStore.activeImage
    if (!image) return null

    const props = {
      ...image,
      caption: image.originalName ?? image.caption,
    }

    return <CustomImage {...props} />
  }

  return (
    <Box flex row ai>
      {photoPositionStore.isShowButton && (
        <IconButton name="prev" onClick={photoPositionStore.setPrevImage} />
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
      {photoPositionStore.isShowButton && (
        <IconButton name="next" onClick={photoPositionStore.setNextImage} />
      )}
    </Box>
  )
})

export const ChangeTextColor = observer(() => (
  <ColorInput
    onChange={photoPositionStore.changeColor}
    value={photoPositionStore.color}
    fullWidth
    label="Цвет текста"
  />
))

export const ChangeBgColor = observer(() => (
  <ColorInput
    onChange={photoPositionStore.changeBgColor}
    value={photoPositionStore.bgColor}
    fullWidth
    label="Цвет фона для текста"
  />
))

export const ChangeBlur = observer(() => (
  <Slider
    onChange={(event, value) => {
      photoPositionStore.changeBlur(Array.isArray(value) ? 0 : value)
    }}
    value={photoPositionStore.blur}
    valueLabelDisplay="auto"
    defaultValue={5}
    max={20}
    marks={[{ value: 10, label: <Icon name="zoomEffect" fontSize="small" /> }]}
  />
))

export const PhotoPosition = () => (
  <Box>
    <Controller
      defaultValue
      name="isShowPhotoWithGoods"
      render={({ field }) => (
        <FormControlLabel
          control={<Checkbox defaultChecked {...field} />}
          label="Показывать фото в списке с товарами как раздел"
        />
      )}
    />
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

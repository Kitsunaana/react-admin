import { Box } from "shared/ui/box"
import {
  Checkbox, FormControlLabel, Slider, Theme, useTheme,
} from "@mui/material"
import { RgbaColorPicker } from "react-colorful"
import { useRef, useState } from "react"
import styled from "styled-components"
import { Input } from "shared/ui/input"
import { useClickAway } from "shared/hooks/use-click-away"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import { IconButton } from "shared/ui/icon-button"
import { SxProps } from "@mui/system"
import { useFormContext, UseFormSetValue } from "react-hook-form"

export const ColorPickerCustom = styled(RgbaColorPicker)<typeof RgbaColorPicker & { theme: Theme; open: boolean }>`
  width: 350px !important;
  padding: 8px 8px 18px 8px;
  background-color: black;
  border-radius: 12px;
  background-image: linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16));
  box-shadow: ${({ theme }) => theme.shadows[8]};
  height: auto !important;
  position: absolute !important;
  bottom: 50px;
  opacity: ${({ open }) => (open ? 1 : 0)};
  transform: ${({ open }) => `scale(${open ? 1 : 0.25})`};
  transform-origin: bottom left;
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  transition: 0.3s;
  
  .react-colorful__saturation {
    height: 180px;
    border-radius: 8px !important;
    margin-bottom: 25px;
  }
  
  .react-colorful__hue {
    margin-bottom: 25px;
    border-radius: 8px;
    height: 10px;
  }
  
  .react-colorful__pointer {
    height: 25px;
    width: 25px;
  }
  
  .react-colorful__alpha {
    border-radius: 8px;
    height: 10px;
  }
`

interface ColorPickerProps {
  sx: SxProps<Theme>
  setValue: (data: any, color: string) => any
}

export const ColorPicker = (props: ColorPickerProps) => {
  const { sx, setValue } = props

  const [open, setOpen] = useState(false)
  const [color, setColor] = useState({
    r: 200, g: 150, b: 35, a: 0.5,
  })

  const colorPickerRef = useRef()
  const theme = useTheme()

  useClickAway(colorPickerRef, () => {
    setOpen(false)
  })

  return (
    <Box sx={{ position: "relative", ...sx }} ref={colorPickerRef}>
      <ColorPickerCustom
        open={open}
        theme={theme}
        color={color}
        onChange={(data) => {
          setColor(data)
          setValue(data, `rgba(${color.r},${color.g},${color.b},${color.a})`)
        }}
      />
      <Input
        onClear={() => {
          setColor({
            r: 0, g: 0, b: 0, a: 1,
          })
        }}
        label="Цвет фона для текста"
        value={`rgba(${color.r},${color.g},${color.b},${color.a})`}
        InputProps={{
          startAdornment: <Box
            onClick={() => setOpen((prevState) => !prevState)}
            sx={{
              width: 40,
              height: 20,
              borderRadius: 1,
              ml: 0.5,
              cursor: "pointer",
              backgroundColor: `rgba(${color.r},${color.g},${color.b},${color.a})`,
            }}
          />,
        }}
      />
    </Box>
  )
}

export const PhotoPosition = () => {
  const { watch, getValues, setValue } = useFormContext()
  const watchedMedia = watch("media")
  const watchedBgColor = watch("bgColor")
  const watchedColor = watch("color")
  const watchedBlur = watch("blur")

  const [indexActiveImage, setIndexActiveImage] = useState(0)

  const onNextImage = () => {
    setIndexActiveImage((prevState) => (watchedMedia[prevState + 1]
      ? prevState + 1
      : 0))
  }

  const onPrevImage = () => {
    setIndexActiveImage((prevState) => (
      watchedMedia[prevState - 1]
        ? prevState - 1
        : watchedMedia.length - 1))
  }

  const [position, setPosition] = useState("top right")

  const gridCheckbox = [
    [
      { content: "flex-start", position: "top left" },
      { content: "center", position: "top center" },
      { content: "flex-end", position: "top right" },
    ],
    [
      { content: "flex-start", position: "center left" },
      { content: "center", position: "center center" },
      { content: "flex-end", position: "center right" },
    ],
    [
      { content: "flex-start", position: "bottom left" },
      { content: "center", position: "bottom center" },
      { content: "flex-end", position: "bottom right" },
    ],
  ]

  return (
    <Box>
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="Показывать фото в списке с товарами как раздел"
      />
      <Box flex ai row jc_sp gap>
        <ColorPicker sx={{ flexBasis: "33%" }} setValue={(data, color) => setValue("bgColor", color)} />
        <ColorPicker sx={{ flexBasis: "33%" }} setValue={(data, color) => setValue("color", color)} />
        <Box sx={{ flexBasis: "33%" }}>
          <Text caption="Эффект стекла фона" />
          <Box sx={{ px: 1 }}>
            <Slider
              aria-label="123"
              valueLabelDisplay="auto"
              defaultValue={5}
              max={20}
              marks={[{ value: 10, label: <Icon name="zoomEffect" fontSize="small" /> }]}
              onChange={(event, value) => setValue("blur", value)}
            />
          </Box>
        </Box>
      </Box>

      <Box flex row ai sx={{ height: 1 }}>
        <IconButton name="prev" onClick={onPrevImage} />
        <Box sx={{ position: "relative", width: 1 }}>
          <Box
            flex
            jc_sp
            sx={{
              position: "absolute", width: 1, height: 250, top: 0, right: 0, p: 1,
            }}
          >
            {gridCheckbox.map((row, index) => (
              <Box key={index} flex ai row jc_sp>
                {row.map((checkbox) => (
                  <Box flex row sx={{ flexBasis: "33.33%", justifyContent: checkbox.content }}>
                    {position === checkbox.position ? (
                      <Text
                        caption={getValues("caption")}
                        sx={{
                          fontSize: 20,
                          lineHeight: 1.5,
                          color: watchedColor,
                          whiteSpace: "pre-line",
                          padding: "4px 8px",
                          background: watchedBgColor,
                          borderRadius: "8px",
                          boxShadow: "rgba(255, 255, 255, 0.25) 0px 4px 30px",
                          backdropFilter: `blur(${watchedBlur}px)`,
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                        }}
                      />
                    ) : (
                      <Checkbox
                        onChange={() => setPosition(checkbox.position)}
                      />
                    )}
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
          <img
            style={{
              width: "100%",
              height: "250px",
              objectFit: "cover",
              borderRadius: 8,
            }}
            src={`http://localhost:3333/${watchedMedia?.[indexActiveImage]?.path}`}
            alt=""
          />
        </Box>
        <IconButton name="next" onClick={onNextImage} />
      </Box>
    </Box>
  )
}

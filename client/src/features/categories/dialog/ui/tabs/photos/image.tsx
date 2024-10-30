import { Box, BoxProps } from "shared/ui/box"
import { alpha, useTheme } from "@mui/material"
import { Text } from "shared/ui/text"
import * as React from "react"
import { useImage } from "shared/hooks/use-image"
import { Image as BaseImage } from "shared/ui/image"
import styled from "styled-components"
import { memo } from "react"
import { IconButton } from "shared/ui/buttons/icon-button"
import { useLang } from "shared/context/lang"
import { UpdateOrder } from "./update-order"

interface ImageProps extends Omit<BoxProps, "id" | "order"> {
  url?: string
  name?: string
  local?: boolean
  id: string
  file?: File
  order?: number | null

  onUpdateOrder?: (order: number, id: string) => void
  onClear?: (id: string) => void
  onClearLocal?: (id: string) => void
  onOpenGallery?: (id: string) => void
}

const ImageCustom = styled(BaseImage)`
  transition: .2s;
  width: 100%;
  height: 170px;
  object-fit: contain;
`

const ImageContainer = styled(Box)`
  position: relative;
  height: 170px;
  overflow: hidden;
`

const ImageHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  right: 0px;
  left: 0px;
  padding: 4px 8px;
  z-index: 30;
  background-color: ${({ theme }) => alpha(theme.palette.grey["900"], 0.85)};
  color: white;
`

const Filename = styled(Text)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
`

const DeleteImageButton = styled(IconButton)`
  && {
    padding: 4px;
    min-width: unset;
    border-radius: 50%;
    color: white;
  }
`

export const Image = memo((props: ImageProps) => {
  const {
    id,
    name,
    url,
    file,
    order,
    local,
    onClear,
    onClearLocal,
    onUpdateOrder,
    onOpenGallery,
    ...other
  } = props

  const theme = useTheme()
  const src = useImage(url ?? file)
  const langBase = useLang()

  const isShowUpdateOrder = onUpdateOrder && order !== undefined

  const handleOnClear = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()

    if (local) onClearLocal?.(id)
    else onClear?.(id)
  }

  return (
    <ImageContainer
      onClick={() => onOpenGallery?.(id)}
      theme={theme}
      {...other}
    >
      <ImageHeader
        theme={theme}
        onClick={(event) => event.stopPropagation()}
      >
        <Filename caption={name} />
        {isShowUpdateOrder && (
          <UpdateOrder
            id={id}
            order={order}
            onClick={onUpdateOrder}
          />
        )}
        <DeleteImageButton
          name="clear"
          fontSize={20}
          onClick={handleOnClear}
          help={{
            title: (
              <Text
                onlyText
                langBase={langBase}
                name="forms.clear"
              />
            ),
          }}
        />
      </ImageHeader>
      <ImageCustom src={src} />
    </ImageContainer>
  )
})

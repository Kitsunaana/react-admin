import { Box, BoxProps } from "shared/ui/box"
import { alpha, useTheme } from "@mui/material"
import { Text } from "shared/ui/text"
import { IconButtonBase } from "shared/ui/buttons/icon-button-base"
import * as React from "react"
import { UpdateOrder } from "features/categories/create-and-edit/ui/update-order"
import { useImage } from "shared/hooks/use-image"
import { Image as BaseImage } from "shared/ui/image"
import styled from "styled-components"
import { memo } from "react"

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
  border-radius: 8px;
  width: 100%;
  height: 170px;
  object-fit: contain;
`

const ImageContainer = styled(Box)`
  position: relative;
  height: 170px;
  overflow: hidden;
  border-radius: 8px;
`

const ImageHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  right: 0px;
  left: 0px;
  padding: 4px 8px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  z-index: 30;
  background-color: ${({ theme }) => alpha(theme.palette.grey["900"], 0.75)};
  color: white;
`

const Filename = styled(Text)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
`

const DeleteImageButton = styled(IconButtonBase)`
  padding: 4px;
  min-width: unset;
  border-radius: 50%;
  color: white;
`

export const Image = memo((props: ImageProps) => {
  const {
    url, name, local, file, id, order, onUpdateOrder, onClear, onClearLocal, onOpenGallery, ...other
  } = props

  const theme = useTheme()
  const src = useImage(url ?? file)

  const isShowUpdateOrder = (order !== undefined && onUpdateOrder)

  const handleOnClear = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()

    if (local) onClearLocal?.(id)
    else onClear?.(id)
  }

  return (
    <ImageContainer onClick={() => onOpenGallery?.(id)} {...other} theme={theme}>
      <ImageHeader theme={theme} onClick={(event) => event.stopPropagation()}>
        <Filename caption={name} />
        {isShowUpdateOrder && (
          <UpdateOrder
            order={order}
            id={id}
            onClick={onUpdateOrder}
          />
        )}
        <DeleteImageButton
          fontSize={20}
          name="clear"
          onClick={handleOnClear}
        />
      </ImageHeader>
      <ImageCustom src={src} />
    </ImageContainer>
  )
})

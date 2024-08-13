import { Box, BoxProps } from "shared/ui/box"
import { alpha, useTheme } from "@mui/material"
import { Text } from "shared/ui/text"
import { IconButton } from "shared/ui/icon-button"
import * as React from "react"
import { UpdateOrder } from "features/categories/create-and-edit/ui/update-order"
import { useImage } from "shared/hooks/use-image"
import { Image as BaseImage } from "shared/ui/image"
import styled from "styled-components"
import { memo } from "react"
import { shallowEqual } from "shared/lib/utils"

interface ImageProps extends Omit<BoxProps, "id" | "order"> {
  url?: string
  name?: string
  local?: boolean
  id: string | number
  file?: File
  order?: number | null

  onUpdateOrder?: (order: number, id: number) => void
  onClear?: (id: number) => void
  onClearLocal?: (id: string) => void
  onOpenGallery?: (id: string | number) => void
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

const DeleteImageButton = styled(IconButton)`
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

  const isShowUpdateOrder = (
    order !== undefined
    && typeof id === "number"
    && onUpdateOrder
  )

  const handleOnClear = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()

    if (typeof id === "number" && onClear) onClear(id)
    if (typeof id === "string" && onClearLocal) onClearLocal(id)
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

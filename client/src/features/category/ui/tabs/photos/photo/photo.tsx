import { memo } from "react"
import { useImage } from "shared/hooks/use-image"
import { Text } from "shared/ui/text"
import { ChangeOrder } from "../change-order"
import {
  DeleteImageButton,
  Filename,
  ImageContainer,
  ImageHeader,
  StyledPhoto,
} from "./styles"

export const Photo = memo(({
  id,
  name,
  path,
  file,
  order,
  onClear,
  onChangeOrder,
  onOpenGallery,
}: {
  id: string
  name: string
  path?: string
  file?: File
  order?: number | null
  onClear: (id: string) => void
  onChangeOrder?: (order: number, id: string) => void
  onOpenGallery: (id: string) => void
}) => {
  const src = useImage(path ?? file)

  const isShowUpdateOrder = onChangeOrder && order !== undefined

  return (
    <ImageContainer onClick={() => onOpenGallery(id)}>
      <ImageHeader onClick={(event) => event.stopPropagation()}>
        <Filename caption={name} />
        {isShowUpdateOrder && (
          <ChangeOrder
            id={id}
            order={order}
            onClick={onChangeOrder}
          />
        )}
        <DeleteImageButton
          name="clear"
          fontSize={20}
          onClick={() => onClear(id)}
          help={{
            title: (
              <Text
                onlyText
                name="forms.clear"
              />
            ),
          }}
        />
      </ImageHeader>
      <StyledPhoto src={src} />
    </ImageContainer>
  )
})

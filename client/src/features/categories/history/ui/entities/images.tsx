import { TemplateEvent, TemplateEventProps } from "features/categories/@history/ui/base"
import { AddImagesEvent } from "features/categories/@history/domain/events"
import { Box } from "shared/ui/box"
import { Text } from "shared/ui/text"
import { Mark } from "shared/ui/mark"

interface AddImagesEventProps extends TemplateEventProps {
  event: AddImagesEvent
}

export const ImagesAddEvent = (props: AddImagesEventProps) => {
  const {
    event,
    selected,
    onClick,
  } = props

  const imageCount = event.images.length

  const caption = imageCount > 1
    ? `Добавлены изображения (${imageCount})`
    : "Добавлено изображение"

  return (
    <TemplateEvent selected={selected} onClick={onClick}>
      <Box flex gap fontSize={12}>
        <Text caption={caption} sx={{ fontSize: 12 }} />
        <Box mb={0.25} flex row gap flexWrap="wrap">
          {event.images.map((image) => (
            <Mark key={image.id} color="success">
              {image.caption}
            </Mark>
          ))}
        </Box>
      </Box>
    </TemplateEvent>
  )
}

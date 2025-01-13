import { Mark } from "shared/ui/mark"
import { AddImagesEvent } from "../../../view-model/history/events"
import { TemplateEvent, TemplateEventProps } from "../base"
import { ImageEventContainer, ImageEventsBox, TemplateEventText } from "./styles"

export const ImagesAddEvent = ({
  event,
  selected,
  onClick,
}: TemplateEventProps & {
  event: AddImagesEvent
}) => {
  const imageCount = event.images.length

  const caption = imageCount > 1
    ? `Добавлены изображения (${imageCount})`
    : "Добавлено изображение"

  return (
    <TemplateEvent selected={selected} onClick={onClick}>
      <ImageEventContainer>
        <TemplateEventText caption={caption} />
        <ImageEventsBox>
          {event.images.map((image) => (
            <Mark key={image.id} color="success">{image.caption}</Mark>
          ))}
        </ImageEventsBox>
      </ImageEventContainer>
    </TemplateEvent>
  )
}

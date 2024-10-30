import { Box } from "shared/ui/box"
import { MarkProps } from "shared/ui/mark"
import { CategoryWithEvents } from "../domain/types"
import { findImage, findMedia, getOriginalName } from "../model/lib"
import { PrevCurrentValueProperty } from "./base"
import { AltNameAddEvent, AltNameRemoveEvent, AltNameUpdateEvent } from "./entities/alt-name"
import {
  CharacteristicAddEvent,
  CharacteristicRemoveEvent,
  CharacteristicUpdateEvent,
} from "./entities/characteristic"
import { ImagesAddEvent } from "./entities/images"
import { TagAddEvent, TagRemoveEvent, TagUpdateEvent } from "./entities/tag"

interface ShowEventsProps {
  events: CategoryWithEvents[]
  moveToVersion: (index: number) => void
  cursor: number
}

export const EventList = (props: ShowEventsProps) => {
  const { events, moveToVersion, cursor } = props

  return (
    <Box flex m={1}>
      {events.map(({ event, newData, lastData }, index) => {
        let caption: string = event.type
        let prevValue: string | null = ""
        let currentValue: string | null = ""
        let currentValueColor: MarkProps["color"] = "success"

        const baseProps = {
          onClick: () => moveToVersion(index),
          selected: index === cursor,
        }

        switch (event.type) {
          case "changeActiveImageId": {
            caption = "Изображение"
            prevValue = getOriginalName(lastData)
            currentValue = getOriginalName(newData)
            break
          }

          case "changeIsShowPhotoWithGoods": {
            caption = "Показывать фото в списке с товарами"
            prevValue = lastData.isShowPhotoWithGoods ? "Да" : "Нет"
            currentValue = newData.isShowPhotoWithGoods ? "Да" : "Нет"
            break
          }

          case "changeColor": {
            caption = "Цвет текста"
            prevValue = lastData.color
            currentValue = newData.color
            break
          }

          case "changeBgColor": {
            caption = "Цвет фона для текста"
            prevValue = lastData.bgColor
            currentValue = newData.bgColor
            break
          }

          case "changeBlur": {
            caption = "Эффект стекла"
            prevValue = String(lastData.blur)
            currentValue = String(newData.blur)
            break
          }

          case "changeCaptionPosition": {
            const translate = {
              "top-left": "Вверху слева",
              "top-center": "Вверху в центре",
              "top-right": "Ввреху справа",
              "center-left": "По середине слева",
              "center-center": "По середине в центре",
              "center-right": "По середине справа",
              "bottom-left": "Снизу слева",
              "bottom-center": "Снизу в центре",
              "bottom-right": "Снизу справа",
            }

            caption = "Позиция текста на фото"
            prevValue = translate[lastData.captionPosition]
            currentValue = translate[newData.captionPosition]
            break
          }

          case "changeCaption": {
            caption = "Название"
            prevValue = lastData.caption
            currentValue = newData.caption
            break
          }

          case "changeDescription": {
            caption = "Описание"
            prevValue = lastData.description
            currentValue = newData.description
            break
          }

          case "removeImage": {
            caption = "Удалено изображение"
            currentValueColor = "error"
            currentValue = String(findImage(lastData.images, event.imageId)?.caption)

            break
          }

          case "removeMedia": {
            caption = "Удалена медиа"
            currentValueColor = "error"
            currentValue = String(findMedia(lastData.media, event.mediaId)?.originalName)

            break
          }

          case "changeMediaOrder": {
            caption = "Порядок изображений"

            const prevMedia = findMedia(lastData.media, event.value.id)
            const currentMedia = findMedia(lastData.media, event.value.id)

            prevValue = `${prevMedia?.originalName} ${prevMedia?.order}`
            currentValue = `${currentMedia?.originalName} ${currentMedia?.order}`

            break
          }

          case "addCharacteristic": {
            return (
              <CharacteristicAddEvent
                {...baseProps}
                key={event.id}
                event={event}
              />
            )
          }

          case "updateCharacteristic": {
            return (
              <CharacteristicUpdateEvent
                {...baseProps}
                key={event.id}
                event={event}
                prev={lastData}
              />
            )
          }

          case "removeCharacteristic": {
            return (
              <CharacteristicRemoveEvent
                {...baseProps}
                key={event.id}
                event={event}
                prev={lastData}
              />
            )
          }

          case "addAltName": {
            return (
              <AltNameAddEvent
                {...baseProps}
                key={event.id}
                event={event}
              />
            )
          }

          case "updateAltName": {
            return (
              <AltNameUpdateEvent
                {...baseProps}
                key={event.id}
                event={event}
                prev={lastData}
              />
            )
          }

          case "removeAltName": {
            return (
              <AltNameRemoveEvent
                {...baseProps}
                key={event.id}
                prev={lastData}
                event={event}
              />
            )
          }

          case "addTag": {
            return (
              <TagAddEvent
                {...baseProps}
                key={event.id}
                event={event}
              />
            )
          }

          case "updateTag": {
            return (
              <TagUpdateEvent
                {...baseProps}
                key={event.id}
                event={event}
                prev={lastData}
              />
            )
          }

          case "removeTag": {
            return (
              <TagRemoveEvent
                {...baseProps}
                key={event.id}
                event={event}
                prev={lastData}
              />
            )
          }

          case "addImages": {
            return (
              <ImagesAddEvent
                {...baseProps}
                key={event.id}
                event={event}
              />
            )
          }

          default:
            break
        }

        return (
          <PrevCurrentValueProperty
            {...baseProps}
            key={event.id}
            caption={caption}
            currentValue={currentValue}
            prevValue={prevValue}
            currentValueColor={currentValueColor}
          />
        )
      })}
    </Box>
  )
}

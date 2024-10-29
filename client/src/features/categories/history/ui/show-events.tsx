import { CategoryWithEvents } from "features/categories/@dialog/model/category-dialog.store"
import { useCategoryStores } from "features/categories/@dialog/ui/context"
import { Box } from "shared/ui/box"
import { MarkProps } from "shared/ui/mark"
import {
  AltNameAddEvent,
  AltNameRemoveEvent,
  AltNameUpdateEvent,
} from "features/categories/@history/ui/entities/alt-name"
import { TagAddEvent, TagRemoveEvent, TagUpdateEvent } from "features/categories/@history/ui/entities/tag"
import {
  CharacteristicAddEvent,
  CharacteristicRemoveEvent,
  CharacteristicUpdateEvent,
} from "features/categories/@history/ui/entities/characteristic"
import { PrevCurrentValueProperty } from "features/categories/@history/ui/base"
import { ImagesAddEvent } from "features/categories/@history/ui/entities/images"
import { findImage, findMedia, getOriginalName } from "features/categories/@history/domain/lib"

interface ShowEventsProps {
  events: CategoryWithEvents[]
  moveToVersion: (index: number) => void
}

export const ShowEvents = (props: ShowEventsProps) => {
  const { events, moveToVersion } = props

  const categoryStores = useCategoryStores()

  return (
    <Box flex m={1}>
      {events.map(({ event, newData, lastData }, index) => {
        let caption: string = event.type
        let prevValue: string | null = ""
        let currentValue: string | null = ""
        let currentValueColor: MarkProps["color"] = "success"

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
                key={event.id}
                event={event}
              />
            )
          }

          case "updateCharacteristic": {
            return (
              <CharacteristicUpdateEvent
                key={event.id}
                event={event}
                prev={lastData}
              />
            )
          }

          case "removeCharacteristic": {
            return (
              <CharacteristicRemoveEvent
                key={event.id}
                event={event}
                prev={lastData}
              />
            )
          }

          case "addAltName": {
            return (
              <AltNameAddEvent
                key={event.id}
                event={event}
              />
            )
          }

          case "updateAltName": {
            return (
              <AltNameUpdateEvent
                key={event.id}
                event={event}
                prev={lastData}
              />
            )
          }

          case "removeAltName": {
            return (
              <AltNameRemoveEvent
                key={event.id}
                prev={lastData}
                event={event}
              />
            )
          }

          case "addTag": {
            return (
              <TagAddEvent
                key={event.id}
                event={event}
              />
            )
          }

          case "updateTag": {
            return (
              <TagUpdateEvent
                key={event.id}
                event={event}
                prev={lastData}
              />
            )
          }

          case "removeTag": {
            return (
              <TagRemoveEvent
                key={event.id}
                event={event}
                prev={lastData}
              />
            )
          }

          default:
            break
        }

        if (event.type === "addImages") {
          return (
            <ImagesAddEvent
              key={event.id}
              selected={false}
              onClick={() => {}}
              event={event}
            />
          )
        }

        return (
          <PrevCurrentValueProperty
            key={event.id}
            caption={caption}
            currentValue={currentValue}
            prevValue={prevValue}
            currentValueColor={currentValueColor}
            onClick={() => moveToVersion(index)}
            selected={index === categoryStores.historyStore._cursor}
          />
        )
      })}
    </Box>
  )
}

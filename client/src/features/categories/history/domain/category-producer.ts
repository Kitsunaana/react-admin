import { CategoryDto } from "shared/types/category"
import { CategoryEvents } from "features/categories/@history/domain/events"
import { produce } from "immer"
import { toJS } from "mobx"
import { isEqual, isNumber, isString } from "shared/lib/utils"
import { Common } from "shared/types/common"

export const categoryProducer = (
  rootState: CategoryDto.CategoryCreate,
  event: CategoryEvents,
) => (
  produce(rootState, (state) => {
    switch (event.type) {
      case "changeIsShowPhotoWithGoods": {
        state.isShowPhotoWithGoods = event.value
        break
      }

      case "changeColor": {
        state.color = event.value
        break
      }

      case "changeBgColor": {
        state.bgColor = event.value
        break
      }

      case "changeBlur": {
        state.blur = event.value
        break
      }

      case "changeActiveImageId": {
        state.activeImageId = event.value
        break
      }

      case "changeCaptionPosition": {
        state.captionPosition = event.value
        break
      }

      case "changeCaption": {
        state.caption = event.value
        break
      }

      case "changeDescription": {
        state.description = event.value
        break
      }

      case "addImages": {
        state.images = [...state.images, ...toJS(event.images)]
        break
      }

      case "removeImage": {
        state.images = state.images.filter((image) => image.id !== event.imageId)
        break
      }

      case "removeMedia": {
        state.media = state.media.filter((media) => media.id !== event.mediaId)
        break
      }

      case "changeMediaOrder": {
        state.media = state.media.map((media) => {
          if (media.id === event.value.id) return { ...media, order: event.value.order }
          return media
        })
        break
      }

      case "addCharacteristic": {
        state.characteristics.push({
          ...event.value,
          action: "create",
        })
        break
      }

      case "updateCharacteristic": {
        state.characteristics = state.characteristics.map((item) => (
          item.id !== event.value.id
            ? item
            : {
              ...item,
              ...event.value,
              action: isString(event.value.id) ? "create" : "update",
            }
        ))
        break
      }

      case "removeCharacteristic": {
        const { value: id } = event

        state.characteristics = state.characteristics
          .map((item): Common.CharacteristicCreate | null => {
            if (isNumber(id) && isEqual(item.id, id)) return { ...item, action: "remove" }
            if (isString(id) && isEqual(item.id, id)) return null

            return item
          })
          .filter((item): item is Common.CharacteristicCreate => item !== null)
        break
      }

      case "addAltName": {
        state.altNames.push({
          ...toJS(event.value),
          action: "create",
        })
        break
      }

      case "removeAltName": {
        const { value: id } = event

        state.altNames = state.altNames
          .map((altName): Common.AltNameCreate | null => {
            if (isNumber(id) && isEqual(altName.id, id)) return { ...altName, action: "remove" }
            if (isString(id) && isEqual(altName.id, id)) return null

            return altName
          })
          .filter((altName): altName is Common.AltNameCreate => altName !== null)
        break
      }

      case "updateAltName": {
        state.altNames = state.altNames.map((item) => (
          item.id !== event.value.id
            ? item
            : {
              ...item,
              ...toJS(event.value),
              action: isNumber(item.id) ? "update" : "create",
            }
        ))
        break
      }

      case "addTag": {
        state.tags.push({
          ...toJS(event.value),
          action: "create",
        })
        break
      }

      case "removeTag": {
        const { value: id } = event

        state.tags = state.tags
          .map((tag): CategoryDto.TagCreate | null => {
            if (isNumber(tag.id) && tag.id === id) return { ...tag, action: "remove" }
            if (isString(tag.id) && tag.id === id) return null

            return tag
          })
          .filter((tag): tag is CategoryDto.TagCreate => tag !== null)
        break
      }

      case "updateTag": {
        state.tags = state.tags
          .map((item) => (item.id !== event.value.id
            ? item
            : {
              ...item,
              ...toJS(event.value),
              action: isNumber(item.id) ? "update" : "create",
            }))
        break
      }

      default:
        return state
    }

    return state
  })
)

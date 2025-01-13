import { produce } from "immer"
import { toJS } from "mobx"
import { isEqual } from "shared/lib/utils"
import { Characteristic } from "entities/characteristic"
import { AltName } from "entities/alt-name"
import { Tag } from "entities/tag"
import { CategoryLocal } from "../../domain/category/types"
import { CategoryEvent } from "./events"

export const producer = (rootState: CategoryLocal, event: CategoryEvent) => (
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
        state.images = state.images.concat(toJS(event.images))
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
        state.characteristics.push({ ...event.value, status: "create" })
        break
      }

      case "updateCharacteristic": {
        state.characteristics = state.characteristics.map((characteristic) => (
          characteristic.id !== event.value.id
            ? characteristic
            : {
              ...characteristic,
              ...event.value,
              status: characteristic.status === "create" ? "create" : "update",
            }
        ))
        break
      }

      case "removeCharacteristic": {
        const { value: id } = event

        state.characteristics = state.characteristics
          .map((item): Characteristic | null => {
            const equal = isEqual(item.id, id)
            const created = item.status === "create"

            if (!created && equal) return { ...item, status: "remove" }
            if (created && equal) return null

            return item
          })
          .filter((item): item is Characteristic => item !== null)
        break
      }

      case "addAltName": {
        state.altNames.push({ ...toJS(event.value), status: "create" })
        break
      }

      case "removeAltName": {
        const { value: id } = event

        state.altNames = state.altNames
          .map((item): AltName | null => {
            const equal = isEqual(item.id, id)
            const created = item.status === "create"

            if (!created && equal) return { ...item, status: "remove" }
            if (created && equal) return null

            return item
          })
          .filter((item): item is AltName => item !== null)

        break
      }

      case "updateAltName": {
        state.altNames = state.altNames.map((item) => (
          item.id !== event.value.id
            ? item
            : {
              ...item,
              ...toJS(event.value),
              status: item.status === "create" ? "create" : "update",
            }
        ))
        break
      }

      case "addTag": {
        state.tags.push({ ...toJS(event.value), status: "create" })
        break
      }

      case "removeTag": {
        const { value: id } = event

        state.tags = state.tags
          .map((item): Tag | null => {
            const equal = isEqual(item.id, id)
            const created = item.status === "create"

            if (!created && equal) return { ...item, status: "remove" }
            if (created && equal) return null

            return item
          })
          .filter((tag): tag is Tag => tag !== null)
        break
      }

      case "updateTag": {
        state.tags = state.tags
          .map((item) => (item.id !== event.value.id
            ? item
            : {
              ...item,
              ...toJS(event.value),
              status: item.status === "create" ? "create" : "update",
            }))
        break
      }

      case "pasteCategoryData":
        return toJS(event.value)

      default:
        return state
    }

    return state
  })
)

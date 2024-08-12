import { useFormContext } from "react-hook-form"
import { useCallback } from "react"
import { dispatch } from "shared/lib/event"
import { TImage } from "features/categories/create-and-edit/model/types"

export function useActionsImage() {
  const { setValue, watch, getValues } = useFormContext()

  const [images, media] = watch(["images", "media"])

  const onOpenGallery = useCallback((id: number | string) => {
    const filteredMedia = media?.filter((media) => !media.deleted)
    const mergedImages = [...(filteredMedia ?? []), ...(images ?? [])]

    const findIndex = mergedImages.findIndex((media) => media.id === id)
    dispatch("gallery", { images: mergedImages, index: findIndex })
  }, [images, media])

  const onUpdateOrder = useCallback((order, id) => {
    const media = (getValues("media") ?? [])
      .map((media) => (media.id === id ? { ...media, order } : media))

    setValue("media", media)
  }, [setValue, getValues])

  const onClear = useCallback((id: number) => {
    const newMedia = (getValues("media") ?? [])
      .map((media) => (media.id === id ? { ...media, deleted: true } : media))

    setValue("media", newMedia)
  }, [getValues, setValue])

  const onClearLocal = useCallback((id: string) => {
    const images = (getValues("images") ?? [])
      .filter((image: TImage) => image.id !== id)

    setValue("images", images)
  }, [getValues, setValue])

  return {
    onOpenGallery,
    onUpdateOrder,
    onClear,
    onClearLocal,
    images,
    media,
  }
}

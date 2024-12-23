import { usePhotosStore } from "../model/photos/use-photos-store"

export const usePhotos = () => {
  const photos = usePhotosStore()

  return [
    {
      images: photos.images.map((image) => ({
        ...image,
        file: image.data,
        name: image.caption,
        onClear: photos.clearImage,
        onOpenGallery: photos.openGallery,
      })),
      media: photos.filteredMedia.map((media) => ({
        ...media,
        name: media.originalName,
        onClear: photos.clearMedia,
        onChangeOrder: photos.updateOrder,
        onOpenGallery: photos.openGallery,
      })),
    },
    {
      filesUpload: photos.setUploadedFiles,
    },
  ] as const
}

import { useFormContext } from "react-hook-form"
import { TImage } from "features/categories/create-and-edit/model/types"

const uuid = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, () => {
  const random = (Math.random() * 16) | 0
  return random.toString(16)
})

export const useFilesUpload = (multiple: boolean = false) => {
  const { setValue, getValues } = useFormContext()

  const setUploadedFiles = (files: TImage[]) => {
    setValue("images", [...(getValues("images") ?? []), ...files])
  }

  const onFileUpload = (event) => {
    const files: TImage[] = []

    Array.prototype.forEach.call(event.target.files, (file: File) => {
      if (multiple) {
        files.push({
          caption: file.name,
          data: file,
          type: file.type,
          id: uuid(),
        })
      }
    })

    if (multiple) setUploadedFiles(files)
  }

  return { onFileUpload }
}

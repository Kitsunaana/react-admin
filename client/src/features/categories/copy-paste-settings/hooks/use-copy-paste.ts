import { UseFormReturn } from "react-hook-form"
import { UseSetValuesApply } from "shared/hooks/use-set-dialog-values"
import {
  base64ToFile,
  copyToClipboard,
  fileToBase64,
  include,
  readOfClipboard,
} from "shared/lib/utils"
import { validation } from "shared/lib/validation"
import { CategoryDto, CategorySchemas } from "shared/types/category"
import { Common } from "shared/types/common"
import { categorySettingsStore } from "../model/category-settings.store"
import { Settings } from "../domain/types"

interface UseCopyPasteOptions {
  apply: UseSetValuesApply
  methods: UseFormReturn<CategoryDto.CategoryCreate>
  getData: () => CategoryDto.CategoryRows,
  setCopiedData: (payload: CategoryDto.CategoryRows, settings: Settings) => void
  callback?: (payload: CategoryDto.CategoryCreate) => void
}

export const useCopyPaste = (options: UseCopyPasteOptions) => {
  const { methods, apply } = options

  const handleCopy = async () => {
    const fields = methods.getValues()
    const rows = options.getData()

    const stringifyImages = async (images: Common.Image[]) => Promise.all(
      images.map(async (image) => ({
        ...image,
        data: await fileToBase64(image.data as File),
      })),
    )

    const mergedData = {
      ...fields,
      ...rows,
      images: await stringifyImages(rows.images),
    }

    await copyToClipboard(mergedData)
  }

  const handlePaste = async () => {
    const readDataOfClipboard = await readOfClipboard()

    const validatedData = validation(CategorySchemas.createCategoriesBody, readDataOfClipboard)

    const category = {
      ...validatedData,
      images: validatedData.images.map((image) => ({
        ...image,
        data: base64ToFile(image.data, image.caption),
      })),
    }

    const applySettings = (Object
      .entries(categorySettingsStore.settingsFields) as Array<[keyof CategoryDto.CategoryFields, boolean]>)
      .filter(([_, value]) => value)
      .map(([key]) => key)

    apply({
      data: category,
      setData: [
        (data) => options.setCopiedData(data, {
          ...categorySettingsStore.settingsFields,
          ...categorySettingsStore.settingsRows,
        }),
        (data) => methods.reset({
          ...methods.getValues(),
          ...include(data, applySettings),
        }),
      ],
    })

    options.callback?.({ ...category, ...methods.getValues() })
  }

  return {
    handleCopy,
    handlePaste,
  }
}

// import { useCategoryStores } from "features/categories/dialog/ui/context"
import { UseFormReturn } from "react-hook-form"
import { UseSetValuesApply } from "shared/hooks/use-set-dialog-values"
import {
  base64ToFile, copyToClipboard, fileToBase64, include, readOfClipboard,
} from "shared/lib/utils"
import { validation } from "shared/lib/validation"
import { CategoryDto, CategorySchemas } from "shared/types/category"
import { Common } from "shared/types/common"

export const useCopyPaste = (
  apply: UseSetValuesApply,
  methods: UseFormReturn<CategoryDto.CategoryCreate>,
  callback?: (payload: CategoryDto.CategoryCreate) => void,
) => {
  const categoryStore = useCategoryStores()

  const handleCopy = async () => {
    const fields = methods.getValues()
    const rows = categoryStore.getData()

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
      .entries(categoryStore.settingsFields) as Array<[keyof CategoryDto.CategoryFields, boolean]>)
      .filter(([_, value]) => value)
      .map(([key]) => key)

    apply({
      data: category,
      setData: [
        categoryStore.setCopiedData,
        (data) => methods.reset({
          ...methods.getValues(),
          ...include(data, applySettings),
        }),
      ],
    })

    callback?.({ ...category, ...methods.getValues() })
  }

  return {
    handleCopy,
    handlePaste,
  }
}

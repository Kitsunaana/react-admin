import {
  base64ToFile, copyToClipboard, fileToBase64, readOfClipboard,
} from "shared/lib/utils"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import { nanoid } from "nanoid"
import { useSettingsStore } from "./setting/use-settings-store"
import { useHistoryStore } from "./history/use-history-store"
import { useCategoryFormContext } from "./form/use-category-form"
import { Image } from "../domain/photo"
import { CategoryLocal } from "../domain/category/types"

export const useCopyPaste = () => {
  const { t } = useTranslation("translation", { keyPrefix: "catalog.dialog.notify" })

  const categoryForm = useCategoryFormContext()

  const settings = useSettingsStore((store) => store.settings)
  const recordEvent = useHistoryStore((store) => store.recordEvent)

  const copy = async () => {
    const category = categoryForm.getFullValues()

    const stringifyImages = async (images: Image[]) => Promise.all(
      images.map(async (image) => ({
        ...image,
        data: await fileToBase64(image.data),
      })),
    )

    const mergedData = {
      ...category,
      images: await stringifyImages(category.images),
    }

    await copyToClipboard(mergedData)
  }

  const paste = async () => {
    const readDataOfClipboard = await readOfClipboard()

    // const validatedData = validation(CategorySchemas.createCategoriesBody, readDataOfClipboard)
    const validatedData = readDataOfClipboard as CategoryLocal

    const category = {
      ...validatedData,
      images: validatedData.images.map((image) => ({
        ...image,
        data: base64ToFile(image.data as unknown as string, image.caption),
      })),
    }

    categoryForm.setCopied(category, settings)

    recordEvent({
      id: nanoid(),
      tab: undefined,
      type: "pasteCategoryData",
      value: category,
    })
  }

  const onCopy = () => {
    toast.promise(copy, {
      error: t("copyError"),
      success: t("copySuccess"),
    })
  }

  const onPaste = () => {
    toast.promise(paste, {
      error: t("pasteError"),
      success: t("pasteSuccess"),
    })
  }

  return {
    copy,
    paste,
    onCopy,
    onPaste,
  }
}

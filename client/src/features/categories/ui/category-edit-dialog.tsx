import {
  FormProvider, useForm,
} from "react-hook-form"
import { TabsContainer } from "shared/ui/tabs/tabs-container"
import { observer } from "mobx-react-lite"
import { useStores } from "features/categories/model/context"
import { UseCategoryFormProps } from "features/categories/model/types"
import { ContentContainer } from "features/categories/ui/content-container"
import { TABS } from "features/categories/model/constants"
import { CopySettingsPopup } from "shared/ui/copy-settings-popup"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { CopySettings } from "features/categories/ui/copy-settings/copy-settings"
import { UpsertDialog } from "shared/ui/dialog/dialog-edit-v3"
import { DialogHeader, DialogHeaderCaption } from "shared/ui/dialog/dialog-header"
import { useGetCategory } from "entities/category/queries/use-category"
import { useSetDialogValues } from "shared/hooks/use-set-dialog-values"
import { CategoryDto, CategorySchemas } from "shared/types/category"
import { useEditCategory } from "features/categories/queries/use-edit-category"
import {
  base64ToFile,
  copyToClipboardV2, exclude, fileToBase64, getNumberOrNull, readOfClipboardV2,
} from "shared/lib/utils"
import { validation } from "shared/lib/validation"
import { useGetConfirmation } from "shared/lib/confirmation"
import { Common } from "shared/types/common"

const defaultValues: UseCategoryFormProps = {
  caption: "",
  description: "",
  bgColor: "",
  color: "",
  captionPosition: "center-right",
  blur: 8,
}

export const useClearDialog = () => {
  const getConfirmation = useGetConfirmation()

  return async (clear: () => void) => {
    const confirmation = await getConfirmation({})

    if (confirmation) clear()
  }
}

export const CategoryEditDialog = observer(() => {
  const methods = useForm<CategoryDto.CategoryCreate>({ defaultValues })
  const dialogStore = useEditDialogStore()
  const categoryStore = useStores()
  const onClear = useClearDialog()

  const { category, isLoadingGet } = useGetCategory(getNumberOrNull(dialogStore.id))
  const { onEdit, isLoadingEdit } = useEditCategory(getNumberOrNull(dialogStore.id))

  const { apply, clear } = useSetDialogValues({
    data: category,
    defaults: defaultValues,
    setData: [
      (data) => data && categoryStore.setData({ ...data, images: [] }),
      (data) => data && methods.reset(exclude(
        data,
        ["characteristics", "altNames", "tags", "media", "activeImageId", "id"],
      ))],
    clearData: [categoryStore.destroy, methods.reset],
    shouldHandle: [dialogStore.open],
  })

  const handleCopyToClipboard = async () => {
    const fields = methods.getValues()
    const rows = categoryStore.getData()

    const stringifyImages = async (images: Common.Image[]) => await Promise.all(
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

    await copyToClipboardV2(mergedData)
  }

  const handlePaste = async () => {
    const readDataOfClipboard = await readOfClipboardV2()

    const validatedData = validation(CategorySchemas.createCategoriesBody, readDataOfClipboard)

    const category = {
      ...validatedData,
      images: validatedData.images.map((image) => ({
        ...image,
        data: base64ToFile(image.data, image.caption),
      })),
    }

    apply<CategoryDto.CategoryCreate>({
      data: category,
      setData: [methods.reset, categoryStore.setCopiedData],
    })
  }

  return (
    <FormProvider {...methods}>
      <UpsertDialog
        store={dialogStore}
        handleSubmit={(data: CategoryDto.CategoryFields) => {
          const payload = categoryStore.getData()

          onEdit({ ...data, ...payload })
        }}
        isLoading={(isLoadingGet || isLoadingEdit) && dialogStore.id !== null}
        container={<ContentContainer />}
        header={(
          <DialogHeader
            store={dialogStore}
            onCopyClick={handleCopyToClipboard}
            onPasteClick={handlePaste}
            onClearClick={() => onClear(clear)}
            showActions
            settings={(
              <CopySettingsPopup>
                <CopySettings />
              </CopySettingsPopup>
            )}
            title={(
              <DialogHeaderCaption
                name="title.edit"
                value="Пиццы"
              />
            )}
          />
        )}
        tabs={(
          <TabsContainer
            tabs={TABS}
            requiredFields={["caption"]}
          />
        )}
        PaperProps={{
          sx: {
            ...(dialogStore.fullScreen
              ? { borderRadius: "0px !important" }
              : {}),
          },
        }}
      />
    </FormProvider>
  )
})

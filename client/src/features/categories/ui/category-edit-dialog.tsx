import {
  DeepPartial,
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
  copyToClipboardV2, exclude, fileToBase64, getNumberOrNull, readOfClipboardV2,
} from "shared/lib/utils"
import { validation } from "shared/lib/validation"

const defaultValues: DeepPartial<UseCategoryFormProps> = {
  caption: "",
  description: "",
  bgColor: "",
  color: "",
  captionPosition: "center-right",
  blur: 8,
}

const copiedCategorySchema = CategorySchemas.getCategoryResponse.omit({
  id: true,
})

export const CategoryEditDialog = observer(() => {
  const methods = useForm<UseCategoryFormProps>({ defaultValues })
  const dialogStore = useEditDialogStore()
  const categoryStore = useStores()

  const { category, isLoadingGet } = useGetCategory(getNumberOrNull(dialogStore.id))
  const { onEdit, isLoadingEdit } = useEditCategory(getNumberOrNull(dialogStore.id))

  const { apply, clear } = useSetDialogValues<CategoryDto.CategoryDto | undefined>({
    data: category,
    defaults: defaultValues,
    setData: [
      categoryStore.setData,
      (data) => data && methods.reset(exclude(
        data,
        ["characteristics", "altNames", "media", "id", "activeImageId"],
      ))],
    clearData: [categoryStore.destroy, methods.reset],
    shouldHandle: [dialogStore.open],
  })

  const handleCopyToClipboard = async () => {
    const fields = methods.getValues()
    const rows = categoryStore.getData()

    const stringifyImages = async (images: [{ data: File }]) => await Promise.all(
      images.map(async (image: { data: File }) => {
        const base64string = await fileToBase64(image.data)

        return {
          ...image,
          data: base64string,
        }
      }),
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

    validation(copiedCategorySchema, readDataOfClipboard)

    apply({
      data: readDataOfClipboard,
      setData: [methods.reset, categoryStore.setCopiedData],
    })
  }

  return (
    <FormProvider {...methods}>
      <UpsertDialog
        store={dialogStore}
        handleSubmit={(data: CategoryDto.CategoryDto) => {
          const payload = categoryStore.getData()

          onEdit({
            activeImageId: payload.activeImageId,
            description: data.description,
            color: data.color,
            characteristics: payload.characteristics,
          })
          // return (
          //   onEdit({ ...data, ...categoryStore.getData() })
          // )
        }}
        isLoading={(isLoadingGet || isLoadingEdit) && dialogStore.id !== null}
        container={<ContentContainer />}
        header={(
          <DialogHeader
            store={dialogStore}
            onCopyClick={handleCopyToClipboard}
            onPasteClick={handlePaste}
            onClearClick={clear}
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

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
import { CopySettings } from "features/categories/ui/copy-settings/copy-settings"
import { UpsertDialog } from "shared/ui/dialog/dialog-edit-v3"
import { DialogHeader, DialogHeaderCaption } from "shared/ui/dialog/dialog-header"
import { useSetDialogValues } from "shared/hooks/use-set-dialog-values"
import { CategoryDto, CategorySchemas } from "shared/types/category"
import {
  copyToClipboardV2, fileToBase64, readOfClipboardV2,
} from "shared/lib/utils"
import { validation } from "shared/lib/validation"
import { useCreateCategory } from "features/categories/queries/use-create-category"
import { useCreateDialogStore } from "shared/ui/dialog/context/dialog-create-context"

const defaultValues: UseCategoryFormProps = {
  caption: "",
  description: "",
  bgColor: "",
  color: "",
  captionPosition: "center-left",
  blur: 8,
}

const copiedCategorySchema = CategorySchemas.getCategoryResponse.omit({
  id: true,
})

export const CategoryCreateDialog = observer(() => {
  const methods = useForm<UseCategoryFormProps>({ defaultValues })
  const dialogStore = useCreateDialogStore()
  const categoryStore = useStores()

  const { onCreate, isLoadingCreate } = useCreateCategory()

  const { apply, clear } = useSetDialogValues({
    data: defaultValues,
    defaults: defaultValues,
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

    apply<CategoryDto.CategoryDto>({
      data: validation(copiedCategorySchema, readDataOfClipboard) as CategoryDto.CategoryDto,
      setData: [
        methods.reset,
        (data) => categoryStore.setCopiedData(data),
      ],
    })
  }

  return (
    <FormProvider {...methods}>
      <UpsertDialog
        store={dialogStore}
        handleSubmit={(data: CategoryDto.CategoryDto) => onCreate({
          ...data,
          ...categoryStore.getData(),
        })}
        isLoading={isLoadingCreate}
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
                name="title.create"
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

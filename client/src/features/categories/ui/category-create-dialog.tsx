import { FormProvider, useForm } from "react-hook-form"
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
  base64ToFile,
  copyToClipboardV2, fileToBase64, include, readOfClipboardV2,
} from "shared/lib/utils"
import { validation } from "shared/lib/validation"
import { useCreateCategory } from "features/categories/queries/use-create-category"
import { useCreateDialogStore } from "shared/ui/dialog/context/dialog-create-context"
import { Common } from "shared/types/common"

const defaultValues: UseCategoryFormProps = {
  caption: "",
  description: "",
  bgColor: "",
  color: "",
  captionPosition: "center-left",
  blur: 8,
}

export const CategoryCreateDialog = observer(() => {
  const methods = useForm<CategoryDto.CategoryCreate>({ defaultValues })
  const dialogStore = useCreateDialogStore()
  const categoryStore = useStores()

  const { onCreate, isLoadingCreate, isSuccessCreate } = useCreateCategory()

  const { apply, clear } = useSetDialogValues({
    data: defaultValues,
    defaults: defaultValues,
    clearData: [categoryStore.destroy, methods.reset],
    shouldHandle: [dialogStore.open],
  })

  const handleCopyToClipboard = async () => {
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

    await copyToClipboardV2(mergedData)
  }

  const handlePaste = async () => {
    const readDataOfClipboard = await readOfClipboardV2()
    const fields = ["bgColor", "color", "blur", "caption", "description", "isShowPhotoWithGoods"] as const

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
      setData: [
        (data) => methods.reset(include(data, fields)),
        categoryStore.setCopiedData,
      ],
    })
  }

  return (
    <FormProvider {...methods}>
      <UpsertDialog
        close={isSuccessCreate}
        store={dialogStore}
        handleSubmit={(data: CategoryDto.CategoryFields) => {
          onCreate({
            ...data,
            ...categoryStore.getData(),
          })
        }}
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

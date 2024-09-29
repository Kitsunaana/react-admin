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
import { CategoryDto } from "shared/types/category"
import { useEditCategory } from "features/categories/queries/use-edit-category"
import { getNumberOrNull } from "shared/lib/utils"

const defaultValues: DeepPartial<UseCategoryFormProps> = {
  caption: "",
  description: "",
  bgColor: "",
  color: "",
  captionPosition: "center-right",
  blur: 8,
}

export const CategoryEditDialog = observer(() => {
  const methods = useForm<UseCategoryFormProps>({ defaultValues })
  const dialogStore = useEditDialogStore()
  const categoryStore = useStores()

  const { category, isLoadingGet } = useGetCategory(getNumberOrNull(dialogStore.id))
  const { onEdit, isLoadingEdit } = useEditCategory(getNumberOrNull(dialogStore.id))

  useSetDialogValues({
    data: category,
    defaults: defaultValues,
    setData: [categoryStore.setData, methods.reset],
    clearData: [categoryStore.destroy, methods.reset],
    shouldHandle: [dialogStore.open],
  })

  return (
    <FormProvider {...methods}>
      <UpsertDialog
        handleSubmit={(data: CategoryDto.CategoryDto) => (
          onEdit({ ...data, ...categoryStore.getData() } as CategoryDto.CategoryUpdateDto)
        )}
        isLoading={(isLoadingGet || isLoadingEdit) && dialogStore.id !== null}
        container={<ContentContainer />}
        header={(
          <DialogHeader
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
            ...(dialogStore.fullScreen ? { borderRadius: "0px !important" } : {}),
          },
        }}
      />
    </FormProvider>
  )
})

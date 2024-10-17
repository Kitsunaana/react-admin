import { useGetCategory } from "entities/category/queries/use-category"
import { CATEGORY_DEFAULT_VALUES, CATEGORY_FIELDS, TABS } from "features/categories/model/constants"
import { useCategoryStores } from "features/categories/model/context"
import { useEditCategory } from "features/categories/queries/use-edit-category"
import { ContentContainer } from "features/categories/ui/content-container"
import { observer } from "mobx-react-lite"
import {
  FormProvider, useForm,
} from "react-hook-form"
import { useEditDialogStore } from "shared/context/dialog-edit-context"
import { useSetDialogValues } from "shared/hooks/use-set-dialog-values"
import {
  getNumberOrNull, include,
} from "shared/lib/utils"
import { CategoryDto } from "shared/types/category"
import { DialogHeader, DialogHeaderCaption } from "shared/ui/dialog/dialog-header"
import { UpsertDialog } from "shared/ui/dialog/upsert-dialog"
import { MenuPopup } from "shared/ui/menu-popup"
import { TabsContainer } from "shared/ui/tabs/tabs-container"
import { useCopyPaste } from "../model/use-copy"
import { PasteSettings } from "./paste-settings/paste-settings"

export const CategoryEditDialog = observer(() => {
  const methods = useForm<CategoryDto.CategoryCreate>({ defaultValues: CATEGORY_DEFAULT_VALUES })
  const dialogStore = useEditDialogStore()
  const categoryStore = useCategoryStores()

  const { category, isLoadingGet } = useGetCategory(getNumberOrNull(dialogStore.id))
  const { onEdit, isLoadingEdit, isSuccessEdit } = useEditCategory(getNumberOrNull(dialogStore.id))

  const { apply } = useSetDialogValues<
    CategoryDto.CategoryDto | undefined,
    CategoryDto.CategoryFields
  >({
    data: category,
    defaults: CATEGORY_DEFAULT_VALUES,
    setData: [
      (data) => categoryStore.setData({ ...data, images: [] }),
      (data) => methods.reset(include(data, CATEGORY_FIELDS)),
    ],
    clearData: [categoryStore.destroy, methods.reset],
    shouldHandle: [dialogStore.open],
  })

  const { handleCopy, handlePaste } = useCopyPaste(methods, apply)

  const handleSubmit = (fields: CategoryDto.CategoryFields) => {
    const rows = categoryStore.getData()
    onEdit({
      ...fields,
      ...rows,
      order: category!.order,
    })
  }

  return (
    <FormProvider {...methods}>
      <UpsertDialog
        close={isSuccessEdit}
        store={dialogStore}
        handleSubmit={handleSubmit}
        isLoading={(isLoadingGet || isLoadingEdit) && dialogStore.id !== null}
        container={<ContentContainer />}
        header={(
          <DialogHeader
            store={dialogStore}
            onCopyClick={handleCopy}
            onPasteClick={handlePaste}
            showActions
            settings={(
              <MenuPopup>
                <PasteSettings />
              </MenuPopup>
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

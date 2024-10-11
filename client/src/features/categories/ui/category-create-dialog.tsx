import { CATEGORY_DEFAULT_VALUES, TABS } from "features/categories/model/constants"
import { useCategoryStores } from "features/categories/model/context"
import { useCreateCategory } from "features/categories/queries/use-create-category"
import { ContentContainer } from "features/categories/ui/content-container"
import { observer } from "mobx-react-lite"
import { FormProvider, useForm } from "react-hook-form"
import { useCreateDialogStore } from "shared/context/dialog-create-context"
import { useSetDialogValues } from "shared/hooks/use-set-dialog-values"
import { CategoryDto } from "shared/types/category"
import { DialogHeader, DialogHeaderCaption } from "shared/ui/dialog/dialog-header"
import { UpsertDialog } from "shared/ui/dialog/upsert-dialog"
import { MenuPopup } from "shared/ui/menu-popup"
import { TabsContainer } from "shared/ui/tabs/tabs-container"
import { useCopyPaste } from "../model/use-copy"
import { PasteSettings } from "./paste-settings/paste-settings"

export const CategoryCreateDialog = observer(() => {
  const methods = useForm<CategoryDto.CategoryCreate>({ defaultValues: CATEGORY_DEFAULT_VALUES })
  const dialogStore = useCreateDialogStore()
  const categoryStore = useCategoryStores()

  const { onCreate, isLoadingCreate, isSuccessCreate } = useCreateCategory()

  const { apply, clear } = useSetDialogValues({
    data: CATEGORY_DEFAULT_VALUES,
    defaults: CATEGORY_DEFAULT_VALUES,
    clearData: [categoryStore.destroy, methods.reset],
    shouldHandle: [dialogStore.open],
  })

  const { handleCopy, handlePaste } = useCopyPaste(methods, apply)

  const handleSubmit = (payload: CategoryDto.CategoryFields) => {
    onCreate({
      ...payload,
      ...categoryStore.getData(),
    })
  }

  return (
    <FormProvider {...methods}>
      <UpsertDialog
        close={isSuccessCreate}
        store={dialogStore}
        handleSubmit={handleSubmit}
        isLoading={isLoadingCreate}
        container={<ContentContainer />}
        header={(
          <DialogHeader
            store={dialogStore}
            onCopyClick={handleCopy}
            onPasteClick={handlePaste}
            onClearClick={clear}
            showActions
            settings={(
              <MenuPopup>
                <PasteSettings />
              </MenuPopup>
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

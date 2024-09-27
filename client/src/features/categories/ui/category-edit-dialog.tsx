import {
  DeepPartial,
  FormProvider, useForm,
} from "react-hook-form"
import { TabsContainer } from "shared/ui/tabs/tabs-container"
import { DialogEditV2 } from "shared/ui/dialog/dialog-edit"
import { useEffect, useMemo } from "react"
import { observer } from "mobx-react-lite"
import { getByIdCategoryOptions, useGetByIdCategory } from "entities/category/queries/use-category"
import { LangContext, useLang } from "shared/context/Lang"
import { useStores } from "features/categories/model/context"
import { UseCategoryFormProps } from "features/categories/model/types"
import { createCategoryOptions, updateCategoryOptions } from "features/categories/queries/queries"
import { ContentContainer } from "features/categories/ui/content-container"
import { TABS } from "features/categories/model/constants"
import { CopySettingsPopup } from "shared/ui/copy-settings-popup"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { CopySettings } from "features/categories/ui/copy-settings/copy-settings"
import { UpsertDialog } from "shared/ui/dialog/dialog-edit-v3"
import { DialogHeader, DialogHeaderCaption } from "shared/ui/dialog/dialog-header"
import { useMutation, useQuery } from "@tanstack/react-query"
import { categoriesApi } from "entities/category/api/categories-api"
import { toast } from "react-toastify"
import { categoriesApi as categoriesApiV2 } from "../api/categories-api"

const defaultValues: DeepPartial<UseCategoryFormProps> = {
  caption: "",
  description: "",
  bgColor: "",
  color: "",
}

/**
 *   langBase?: string
 *   size?: "auto"
 *   height?: number | string
 *   defaultValues?: DeepPartial<any>
 *   getData?: () => any
 *   storeReset?: () => void
 *   header?: ReactNode
 */

export const useGetCategory = (id: number | null) => {
  const { data, isPending, isFetching } = useQuery({
    enabled: id !== null,
    queryKey: ["category", id],
    queryFn: () => toast.promise(new Promise((resolve) => {
      if (typeof id !== "number") return

      setTimeout(() => {
        categoriesApi
          .getById(id)
          .then(resolve)
      }, 1000)
    }), {
      success: { data: "Категория успешно загружена", autoClose: 1000 },
      pending: "Категория загружается",
    }),
  })

  return { category: data, isLoadingGet: isPending || isFetching }
}

export const useEditCategory = (id: number | null) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["category", id],
    mutationFn: (data) => toast.promise(categoriesApiV2.patch(id, data), {
      pending: "Категория обновляется",
      error: "Ой, произошла какая-то ошибка",
      success: "Категория успешно обновлена",
    }, { autoClose: 1500 }),
  })

  return { onEdit: mutate, isLoadingEdit: isPending }
}

export const CategoryEditDialog = observer(() => {
  const methods = useForm<UseCategoryFormProps>({ defaultValues })
  const categoryStore = useStores()
  const dialogStore = useEditDialogStore()

  const { category, isLoadingGet } = useGetCategory(dialogStore.id as any)
  const { onEdit, isLoadingEdit } = useEditCategory(dialogStore.id as any)

  return (
    <FormProvider {...methods}>
      <UpsertDialog
        handleSubmit={onEdit}
        data={category}
        defaultValues={defaultValues}
        isLoading={isLoadingGet || isLoadingEdit}
        setData={categoryStore.setData}
        getData={categoryStore.getData}
        clearData={categoryStore.destroy}
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
      />
    </FormProvider>
  )
})

/* export const CategoryEditDialog = observer(() => {
  const rootStore = useStores()
  const { fullScreen } = useEditDialogStore()

  const defaultValues: DeepPartial<UseCategoryFormProps> = {
    caption: "",
    description: "",
    bgColor: "",
    color: "",
  }

  const methods = useForm<UseCategoryFormProps>({ defaultValues })
  const requiredFields = useMemo(() => ["caption"], [])
  const langBase = useLang()

  return (
    <FormProvider {...methods}>
      <LangContext lang={`${langBase}.dialog`}>
        <DialogEditV2
          showActions
          defaultValues={defaultValues}
          onCreateOptions={createCategoryOptions}
          onUpdateOptions={updateCategoryOptions}
          onGetByIdOptions={getByIdCategoryOptions}
          getData={rootStore.getData}
          setData={rootStore.setData}
          storeReset={rootStore.destroy}
          getCopyData={rootStore.getCopyData}
          settingInputs={rootStore.settingInputs}
          container={<ContentContainer />}
          settings={(
            <CopySettingsPopup
              content={(
                <LangContext lang={`${langBase}.dialog.copySettings`}>
                  <CopySettings
                    buttonGroups={["images", "characteristics", "tags"]}
                    onChangeSettings={rootStore.onChangePasteSettings}
                    onChangeSettingInput={rootStore.onChangeSettingInput}
                    settings={rootStore.settings}
                    settingInputs={rootStore.settingInputs}
                  />
                </LangContext>
              )}
            />
          )}
          tabs={(
            <LangContext lang={`${langBase}.dialog.tabs`}>
              <TabsContainer
                tabs={TABS}
                requiredFields={requiredFields}
              />
            </LangContext>
          )}
          PaperProps={{
            sx: {
              ...(fullScreen ? { borderRadius: 0 } : {}),
            },
          }}
        />
      </LangContext>
    </FormProvider>
  )
}) */

import * as React from "react"
import {
  DeepPartial,
  FormProvider, useForm,
} from "react-hook-form"
import { TabsContainer } from "shared/ui/tabs/tabs-container"
import { DialogEditV2 } from "shared/ui/dialog/dialog-edit"
import {
  createCategoryOptions,
  updateCategoryOptions,
} from "features/categories/edit/queries/queries"
import { TABS } from "features/categories/edit/model/constants"
import { ContentContainer } from "features/categories/edit/ui/content-container"
import { useMemo } from "react"
import { observer } from "mobx-react-lite"
import { UseCategoryFormProps } from "features/categories/edit/model/types"
import { getByIdCategoryOptions } from "entities/category/queries/use-category"
import { LangContext } from "shared/context/Lang"
import { StoreProvider, useStores } from "features/categories/edit/model/context"

export const EditDialog = observer(() => {
  const langBase = "catalog.dialog"

  const rootStore = useStores()

  const defaultValues: DeepPartial<UseCategoryFormProps> = {
    caption: "",
    description: "",
  }

  const methods = useForm<UseCategoryFormProps>({ defaultValues })
  const requiredFields = useMemo(() => ["caption"], [])

  return (
    <FormProvider {...methods}>
      <LangContext lang="global.dialog">
        <DialogEditV2
          defaultValues={defaultValues}
          onCreateOptions={createCategoryOptions}
          onUpdateOptions={updateCategoryOptions}
          onGetByIdOptions={getByIdCategoryOptions}
          getData={rootStore.getData}
          setData={rootStore.setData}
          storeReset={rootStore.destroy}
          container={<ContentContainer />}
          tabs={(
            <TabsContainer
              langBase={langBase}
              tabs={TABS}
              requiredFields={requiredFields}
            />
          )}
        />
      </LangContext>
    </FormProvider>
  )
})

export const CategoryEditDialog = () => (
  <StoreProvider>
    <EditDialog />
  </StoreProvider>
)

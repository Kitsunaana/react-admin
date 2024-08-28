import * as React from "react"
import {
  FormProvider, useForm,
} from "react-hook-form"
import { TabsContainer } from "shared/ui/tabs/tabs-container"
import { DialogEdit } from "shared/ui/dialog/dialog-edit"
import {
  createCategoryOptions,
  updateCategoryOptions,
} from "features/categories/create-and-edit/queries/queries"
import { tabs } from "features/categories/create-and-edit/model/constants"
import { ContentContainer } from "features/categories/create-and-edit/ui/content-container"
import { useMemo } from "react"
import { observer } from "mobx-react-lite"
import { UseCategoryFormProps } from "features/categories/create-and-edit/model/types"
import { getByIdCategoryOptions } from "entities/category/queries/use-category"
import { LangContext } from "shared/context/Lang"
import { StoreProvider, useStores } from "features/categories/create-and-edit/model/context"

export const EditDialog = observer(() => {
  const tabDefault = 0
  const langBase = "catalog.dialog"

  const rootStore = useStores()

  const methods = useForm<UseCategoryFormProps>({
    defaultValues: {
      caption: "",
    },
  })

  const requiredFields = useMemo(() => ["caption"], [])

  return (
    <FormProvider {...methods}>
      <LangContext lang="global.dialog">
        <DialogEdit
          onCreateOptions={createCategoryOptions}
          onUpdateOptions={updateCategoryOptions}
          onGetByIdOptions={getByIdCategoryOptions}
          getData={rootStore.getData}
          setData={rootStore.setData}
          storeReset={rootStore.destroy}
          container={(
            <ContentContainer
              langBase={langBase}
              tab={tabDefault}
            />
          )}
          tabs={(
            <TabsContainer
              langBase={langBase}
              tabs={tabs}
              tab={tabDefault}
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

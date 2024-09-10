import * as React from "react"
import {
  DeepPartial,
  FormProvider, useForm,
} from "react-hook-form"
import { TabsContainer } from "shared/ui/tabs/tabs-container"
import { DialogEditV2 } from "shared/ui/dialog/dialog-edit"

import { useMemo } from "react"
import { observer } from "mobx-react-lite"
import { getByIdCategoryOptions } from "entities/category/queries/use-category"
import { LangContext } from "shared/context/Lang"
import { StoreProvider, useStores } from "features/categories/model/context"
import { UseCategoryFormProps } from "features/categories/model/types"
import { createCategoryOptions, updateCategoryOptions } from "features/categories/queries/queries"
import { ContentContainer } from "features/categories/ui/content-container"
import { TABS } from "features/categories/model/constants"
import { CopySettings } from "shared/ui/test"

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
          getCopyData={rootStore.getCopyData}
          settingInputs={rootStore.settingInputs}
          container={<ContentContainer />}
          settings={(
            <CopySettings
              buttonGroups={["images", "characteristics", "altNames", "tags"]}
              onChangeSettings={rootStore.onChangePasteSettings}
              onChangeSettingInput={rootStore.onChangeSettingInput}
              settings={rootStore.settings}
              settingInputs={rootStore.settingInputs}
            />
          )}
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
  <EditDialog />
)

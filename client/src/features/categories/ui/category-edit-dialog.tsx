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
import { LangContext, useLang } from "shared/context/Lang"
import { useStores } from "features/categories/model/context"
import { UseCategoryFormProps } from "features/categories/model/types"
import { createCategoryOptions, updateCategoryOptions } from "features/categories/queries/queries"
import { ContentContainer } from "features/categories/ui/content-container"
import { TABS } from "features/categories/model/constants"
import { CopySettingsPopup } from "shared/ui/copy-settings-popup"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { CopySettings } from "features/categories/ui/copy-settings/copy-settings"

export const CategoryEditDialog = observer(() => {
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
                <CopySettings
                  buttonGroups={["images", "characteristics", "tags"]}
                  onChangeSettings={rootStore.onChangePasteSettings}
                  onChangeSettingInput={rootStore.onChangeSettingInput}
                  settings={rootStore.settings}
                  settingInputs={rootStore.settingInputs}
                />
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
})

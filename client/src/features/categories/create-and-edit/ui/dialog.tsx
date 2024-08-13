import * as React from "react"
import {
  FormProvider, useForm,
} from "react-hook-form"
import { TabsContainer } from "shared/ui/tabs-container"
import { Box } from "shared/ui/box"
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

export const Dialog = observer(() => {
  const tabDefault = 0
  const langBase = "catalog.dialog"

  const methods = useForm<UseCategoryFormProps>({
    defaultValues: {
      color: "red",
      bgColor: "blue",
      blur: 5,
      images: [],
      media: [],
      captionPosition: "center-center",
    },
  })

  return (
    <FormProvider {...methods}>
      <DialogEdit
        onCreateOptions={createCategoryOptions}
        onUpdateOptions={updateCategoryOptions}
        onGetByIdOptions={getByIdCategoryOptions}
        container={useMemo(() => (
          <Box flex gap>
            <TabsContainer
              langBase={langBase}
              tabs={tabs}
              tab={tabDefault}
              requiredFields={["caption"]}
            />
            <ContentContainer
              langBase={langBase}
              tab={tabDefault}
            />
          </Box>
        ), [])}
      />
    </FormProvider>
  )
})

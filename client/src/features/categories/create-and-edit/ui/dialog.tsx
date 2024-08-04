import * as React from "react"
import {
  FormProvider, useForm,
} from "react-hook-form"
import { TabsContainer } from "shared/ui/tabs-container"
import { Box } from "shared/ui/box"
import { DialogEdit } from "shared/ui/dialog/dialog-edit"
import {
  createCategoryOptions,
  getByIdCategoryOptions,
  updateCategoryOptions,
} from "features/categories/create-and-edit/queries/queries"
import { tabs } from "features/categories/create-and-edit/model/constants"
import { UseFormProps } from "features/categories/create-and-edit/model/types"
import { ContentContainer } from "features/categories/create-and-edit/ui/content-container"
import { useCallback } from "react"

export const Dialog = () => {
  const tabDefault = 0
  const langBase = "catalog.dialog"

  const methods = useForm<UseFormProps>({
    defaultValues: {
      caption: "",
      description: "",
    },
  })

  const renderContainer = useCallback((fullScreen) => (
    <Box flex gap>
      <TabsContainer
        langBase={langBase}
        tabs={tabs}
        tab={tabDefault}
        requiredFields={["caption"]}
      />
      <ContentContainer
        fullScreen={fullScreen}
        langBase={langBase}
        tab={tabDefault}
      />
    </Box>
  ), [])

  return (
    <FormProvider {...methods}>
      <DialogEdit
        onCreateOptions={createCategoryOptions}
        onUpdateOptions={updateCategoryOptions}
        onGetByIdOptions={getByIdCategoryOptions}
        container={renderContainer}
      />
    </FormProvider>
  )
}

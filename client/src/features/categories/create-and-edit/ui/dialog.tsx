import * as React from "react"
import {
  FormProvider, useForm,
} from "react-hook-form"
import { TabsContainer } from "shared/ui/tabs/tabs-container"
import { Box } from "shared/ui/box"
import { DialogEdit } from "shared/ui/dialog/dialog-edit"
import {
  createCategoryOptions,
  updateCategoryOptions,
} from "features/categories/create-and-edit/queries/queries"
import { tabs } from "features/categories/create-and-edit/model/constants"
import { ContentContainer } from "features/categories/create-and-edit/ui/content-container"
import {
  createContext,
  FC, PropsWithChildren, useContext, useMemo, useState,
} from "react"
import { observer } from "mobx-react-lite"
import { UseCategoryFormProps } from "features/categories/create-and-edit/model/types"
import { getByIdCategoryOptions } from "entities/category/queries/use-category"
import { createRootStore } from "features/categories/create-and-edit/model/stores/dialog-store"

const RootStoreContext = createContext(createRootStore())
export const useStores = () => useContext(RootStoreContext)

export const StoreProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props

  const [state] = useState(createRootStore)

  return (
    <RootStoreContext.Provider value={state}>
      {children}
    </RootStoreContext.Provider>
  )
}

export const Dialog = observer(() => {
  const tabDefault = 5
  const langBase = "catalog.dialog"

  const rootStore = useStores()

  const methods = useForm<UseCategoryFormProps>({
    defaultValues: {
      caption: "",
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
        getData={rootStore.getData}
        setData={rootStore.setData}
        storeReset={rootStore.destroy}
        container={useMemo(() => (
          <Box grow sx={{ height: 450, pt: 0 }}>
            <Box flex sx={{ height: 1 }}>
              <TabsContainer
                langBase={langBase}
                tabs={tabs}
                tab={tabDefault}
                requiredFields={["caption"]}
              />
              <Box sx={{ px: 1, height: 1 }}>
                <ContentContainer
                  langBase={langBase}
                  tab={tabDefault}
                />
              </Box>
            </Box>
          </Box>
        ), [])}
      />
    </FormProvider>
  )
})

export const DialogCategory = () => (
  <StoreProvider>
    <Dialog />
  </StoreProvider>
)

import { DialogEditV2 } from "shared/ui/dialog/dialog-edit"
import { queryOptions, UseMutationOptions } from "@tanstack/react-query"
import { $axios } from "shared/config/axios"
import { FormProvider, useForm } from "react-hook-form"
import { TabsContainer } from "shared/ui/tabs/tabs-container"
import { TABS } from "features/goods/dialog/model/tabs"
import { ContentContainer } from "features/goods/dialog/ui/content-container"
import { LangContext } from "shared/context/lang"

const onGetByIdOptions = (id: number | null) => queryOptions({
  queryKey: [""],
  queryFn: () => $axios.get("/categories"),
})

const onCreateOptions = (): UseMutationOptions => ({
  mutationKey: [""],
  mutationFn: () => $axios.get(""),
})

const onUpdateOptions = (): UseMutationOptions => ({
  mutationKey: [""],
  mutationFn: () => $axios.get(""),
})

export const GoodEditDialog = () => {
  const langBase = "goods.dialog"

  const methods = useForm({
    defaultValues: { caption: "" },
  })

  return (
    <FormProvider {...methods}>
      <LangContext lang="global.dialog">
        <DialogEditV2
          onGetByIdOptions={onGetByIdOptions}
          onCreateOptions={onCreateOptions}
          onUpdateOptions={onUpdateOptions}
          tabs={<TabsContainer tabs={TABS} langBase={langBase} requiredFields={["category"]} />}
          container={<ContentContainer />}
        />
      </LangContext>
    </FormProvider>
  )
}

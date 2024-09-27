import { DialogEditV2 } from "shared/ui/dialog/dialog-edit"
import { queryOptions, UseMutationOptions } from "@tanstack/react-query"
import { $axios } from "shared/config/axios"
import { FormProvider, useForm } from "react-hook-form"
import { TabsContainer } from "shared/ui/tabs/tabs-container"
import { TABS } from "features/goods/dialog/model/tabs"
import { ContentContainer } from "features/goods/dialog/ui/content-container"
import { LangContext } from "shared/context/lang"
import { useStores } from "features/goods/dialog/model/context"
import { z } from "zod"
import { mediaSchema } from "features/categories/model/schemas"
import { goodsApi } from "shared/api/goods-api"

export const createGoodSchema = z.object({
  article: z.string(),
  caption: z.string(),
  category: z.object({
    id: z.number(),
    caption: z.string(),
    description: z.string(),
    order: z.number(),
  }),
  deliveryTime: z.string(),
  description: z.string(),
  images: z.array(z.object({
    caption: z.string(),
    data: z.instanceof(File),
    id: z.string(),
    type: z.string(),
  })),
  isConsumable: z.boolean(),
  isHot: z.boolean(),
  isNew: z.boolean(),
  label: z.string(),
  notCalculation: z.boolean(),
  media: z.array(mediaSchema),
})

export type CreateGood = z.infer<typeof createGoodSchema>

const onGetByIdOptions = (id: number | null) => queryOptions({
  enabled: id !== null,
  queryKey: ["good", id],
  queryFn: () => goodsApi.getById(id),
})

const onCreateOptions = (): UseMutationOptions<any, any, CreateGood> => ({
  mutationKey: ["goods"],
  mutationFn: (data: CreateGood) => goodsApi.post(data),
})

const onUpdateOptions = (): UseMutationOptions => ({
  mutationKey: [""],
  mutationFn: () => $axios.get(""),
})

export const GoodEditDialog = () => {
  const store = useStores()
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
          getData={store.getData}
          defaultValues={{
            category: null,
            caption: null,
          }}
          tabs={(
            <TabsContainer
              tabs={TABS}
              requiredFields={["category"]}
            />
          )}
          container={<ContentContainer />}
        />
      </LangContext>
    </FormProvider>
  )
}

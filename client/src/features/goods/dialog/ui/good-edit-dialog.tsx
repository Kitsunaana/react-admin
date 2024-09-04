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
import { validation } from "shared/lib/validation"
import { createMultipart } from "shared/lib/multipart"

const URL = "/goods"

export const createGoodSchema = z.object({
  article: z.string(),
  caption: z.string(),
  category: z.object({
    id: z.number(),
    caption: z.string(),
    description: z.string().nullable(),
    order: z.number(),
  }),
  deliveryTime: z.string(),
  description: z.string(),
  isConsumable: z.boolean(),
  isHot: z.boolean(),
  isNew: z.boolean(),
  label: z.string(),
  notCalculation: z.boolean(),
  photos: z.object({
    // media: z.string(),
    images: z.array(z.object({
      caption: z.string(),
      data: z.instanceof(File),
      id: z.string(),
      type: z.string(),
    })),
  }),
})

export type CreateGood = z.infer<typeof createGoodSchema>

export const goodsApi = {
  post: async (data: z.infer<typeof createGoodSchema>) => {
    console.log(data)
    try {
      validation(createGoodSchema, data)

      const imagesIds = data.photos.images?.map(({ id, caption }) => ({ id, caption }))

      const formData = createMultipart({ ...data, imagesIds }, ["images"])
      const response = await $axios.post(URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      return response.data
    } catch (error) {
      if (error instanceof Error) console.log(error.message)
    }
  },

  patch: async (id: number | null, data: z.infer<typeof createGoodSchema>) => {
    try {
      if (!id) throw new Error("Не указан id для катеогрии в запросе на редактирование")

      validation(createGoodSchema, data)

      const imagesIds = data.photos.images?.map(({ id, caption }) => ({ id, caption }))

      const formData = createMultipart({ ...data, imagesIds }, ["images"])
      const response = await $axios.patch(`${URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      return response.data
    } catch (error) {
      if (error instanceof Error) console.log(error.message)
    }
  },
}

const onGetByIdOptions = (id: number | null) => queryOptions({
  enabled: id !== null,
  queryKey: [""],
  queryFn: () => $axios.get("/categories").then(({ data }) => data),
})

const onCreateOptions = (): UseMutationOptions<any, any, CreateGood> => ({
  mutationKey: [""],
  mutationFn: (data: CreateGood) => goodsApi.post(data),
})

const onUpdateOptions = (): UseMutationOptions => ({
  mutationKey: [""],
  mutationFn: () => $axios.get(""),
})

export const GoodEditDialog = () => {
  const langBase = "goods.dialog"

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
          tabs={(
            <TabsContainer
              tabs={TABS}
              langBase={langBase}
              requiredFields={["category"]}
            />
          )}
          container={<ContentContainer />}
        />
      </LangContext>
    </FormProvider>
  )
}

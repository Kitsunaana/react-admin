import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query"
import { z } from "zod"
import { createMultipart } from "shared/lib/multipart"
import { $axios } from "shared/config/axios"
import { queryClient } from "app/providers/query-client"
import { categorySchema } from "../model/schemas"

type UpdateUseCategoryOptions = UseMutationOptions<unknown, unknown, z.infer<typeof categorySchema>>
type CreateUseCategoryOptions = {} & UpdateUseCategoryOptions

export const updateCategoryOptions = (id: number | null): UpdateUseCategoryOptions => ({
  mutationKey: ["category", id],
  mutationFn: (data: z.infer<typeof categorySchema>) => {
    const formData = createMultipart(data)
    return $axios.patch(`/categories/${id}`, data).then(({ data }) => data)
  },
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["categories"],
    })
  },
})

export const createCategoryOptions = (): CreateUseCategoryOptions => ({
  mutationKey: ["category"],
  mutationFn: (data: Record<string, any>) => {
    const formData = createMultipart(data, ["images"])

    return $axios.post("/categories", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(({ data }) => data)
      .catch((error) => console.log(error))
  },
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["categories"],
    })
  },
})

export const getByIdCategoryOptions = (id: number | null): UseQueryOptions => ({
  enabled: id !== null,
  queryKey: ["category", id],
  queryFn: () => $axios.get(`/categories/${id}`)
    .then(({ data }) => data),
})

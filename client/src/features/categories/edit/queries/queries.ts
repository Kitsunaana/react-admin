import { UseMutationOptions } from "@tanstack/react-query"
import { z } from "zod"
import { queryClient } from "app/providers/query-client"
import { categoriesApi } from "features/categories/edit/api/categories-api"
import { createCategorySchema } from "../model/schemas"

type UpdateUseCategoryOptions = UseMutationOptions<unknown, unknown, z.infer<typeof createCategorySchema>>
type CreateUseCategoryOptions = {} & UpdateUseCategoryOptions

export const updateCategoryOptions = (id: number | null, onClose: () => void): UpdateUseCategoryOptions => ({
  mutationKey: ["category", id],
  mutationFn: (data) => categoriesApi.patch(id, data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["categories"] })
    onClose()
  },
})

export const createCategoryOptions = (onClose: () => void): CreateUseCategoryOptions => ({
  mutationKey: ["category"],
  mutationFn: (data) => categoriesApi.post(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["categories"] })
    onClose()
  },
})

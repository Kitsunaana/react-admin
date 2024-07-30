import { useMutation } from "@tanstack/react-query"
import { z } from "zod"
import axios from "axios"
import { queryClient } from "app/providers/query-client"
import { categoriesSchema, categorySchema, formSchema } from "features/categories/create/model/schemas"
import { $axios } from "shared/config/axios"

export const useCreateCategory = () => {
  const {
    mutate, data, isSuccess, isError, isPending,
  } = useMutation({
    mutationKey: ["categories"],
    mutationFn: (data: z.infer<typeof formSchema>) => $axios.post("/categories", data)
      .then((response) => response.data),
    onSuccess: (categoriesData) => {
      const { data, error } = categorySchema.safeParse(categoriesData)
      if (error) return

      queryClient.setQueryData(["categories"], (prevCategories) => {
        const { success, data: categories } = categoriesSchema.safeParse(prevCategories)

        return success ? [...categories, data] : prevCategories
      })
    },
  })

  return {
    createCategory: mutate,
    data,
    isSuccess,
    isError,
    isPending,
  }
}

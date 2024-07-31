import { useMutation } from "@tanstack/react-query"
import { z } from "zod"
import { queryClient } from "app/providers/query-client"
import { categoriesSchema, categorySchema, formSchema } from "features/categories/create/model/schemas"
import { $axios } from "shared/config/axios"
import { createMultipart } from "shared/lib/multipart"

export const useCreateCategory = () => {
  const {
    mutate, data, isSuccess, isError, isPending,
  } = useMutation({
    mutationKey: ["categories"],
    mutationFn: (data: z.infer<typeof categorySchema>) => {
      const formData = createMultipart(data, ["images"])
      formData.append("caption", data.caption)

      return $axios.post("/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((response) => response.data)
        .catch((error) => console.log(error))
    },
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

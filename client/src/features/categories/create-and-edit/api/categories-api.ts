import { $axios } from "shared/config/axios"
import { validation } from "shared/lib/validation"
import { createCategorySchema } from "features/categories/create-and-edit/model/schemas"
import { createMultipart } from "shared/lib/multipart"
import { z } from "zod"

const URL = "/categories"

export const categoriesApi = {
  post: async (data: z.infer<typeof createCategorySchema>) => {
    try {
      validation(createCategorySchema, data)

      const formData = createMultipart(data, ["images"])
      const response = await $axios.post(URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      return response.data
    } catch (error) {
      if (error instanceof Error) console.log(error.message)
    }
  },

  patch: async (id: number | null, data: z.infer<typeof createCategorySchema>) => {
    try {
      if (!id) throw new Error("Не указан id для катеогрии в запросе на удаление")

      validation(createCategorySchema, data)
      const formData = createMultipart(data, ["images"])

      const response = await $axios.patch(`${URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      return response.data
    } catch (error) {
      if (error instanceof Error) console.log(error.message)
    }
  },
}

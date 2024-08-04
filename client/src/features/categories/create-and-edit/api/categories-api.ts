import { $axios } from "shared/config/axios"
import { validation } from "shared/lib/validation"
import { categoryFormSchema } from "features/categories/create-and-edit/model/schemas"
import { createMultipart } from "shared/lib/multipart"
import { z } from "zod"

const URL = "/categories"

export const categoriesApi = {
  patch: async (id: number | null, data: z.infer<typeof categoryFormSchema>) => {
    try {
      if (!id) throw new Error("Не указан id для катеогрии в запросе на удаление")

      const validatedData = validation(categoryFormSchema, data)
      const formData = createMultipart(validatedData, ["images"])

      const response = await $axios.patch(`${URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      return response.data
    } catch (error) {
      if (error instanceof Error) console.log(error.message)
    }
  },

  post: async (data: z.infer<typeof categoryFormSchema>) => {
    try {
      validation(categoryFormSchema, data)

      const formData = createMultipart(data, ["images"])

      const response = await $axios.post(URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      return response.data
    } catch (error) {
      if (error instanceof Error) console.log(error.message)
    }
  },
}

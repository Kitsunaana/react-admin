import { $axios } from "shared/config/axios"
import { validation } from "shared/lib/validation"
import { createMultipart } from "shared/lib/multipart"
import { z } from "zod"
import { CategoryDto, CategorySchemas } from "shared/types/category"
import { createCategorySchema } from "../model/schemas"

const URL = "/categories"

export const categoriesApi = {
  post: async (data: z.infer<typeof createCategorySchema>) => {
    try {
      console.log(data)
      validation(createCategorySchema, data)

      const imagesIds = data.images?.map(({ id, caption }) => ({ id, caption }))

      const formData = createMultipart({ ...data, imagesIds }, ["images"])
      const response = await $axios.post(URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      return response.data
    } catch (error) {
      if (error instanceof Error) console.log(error.message)
    }
  },

  patch: async (
    id: number | null,
    data: CategoryDto.CategoryUpdateDto,
  ): Promise<CategoryDto.PatchCategoryResponse> => {
    try {
      const imagesIds = data.images?.map(({ id, caption }) => ({ id, caption }))

      const formData = createMultipart({ ...data, imagesIds }, ["images"])
      const response = await $axios.patch<CategoryDto.PatchCategoryResponse>(
        `${URL}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )

      return validation(CategorySchemas.updateCategoryResponse, response.data)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
}

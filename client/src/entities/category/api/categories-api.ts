import { $axios } from "shared/config/axios"
import { stringifiedParams } from "shared/lib/utils"
import { CategoryDto, CategorySchemas } from "shared/types/category"
import { validation } from "shared/lib/validation"
import { z } from "zod"
import { IParams } from "../model/types"

const URL = "/categories"

export const categoriesApi = {
  getAll: async (params: IParams): Promise<CategoryDto.GetAllCategoriesResponse> => {
    const { data } = await $axios.get(`${URL}${stringifiedParams(params)}`)

    return (
      validation(
        CategorySchemas.getCategoriesResponse,
        data,
      ) as CategoryDto.GetAllCategoriesResponse
    )
  },

  getById: async (
    params: z.infer<typeof CategorySchemas.getCategoryParams>,
  ): Promise<CategoryDto.GetByIdCategoryResponse> => {
    const validatedParams = validation(CategorySchemas.getCategoryParams, params)
    const { categoryId } = validatedParams

    const { data } = await $axios.get(`${URL}/${categoryId}`)

    return (
      validation(
        CategorySchemas.getCategoryResponse,
        data,
      ) as CategoryDto.GetByIdCategoryResponse
    )
  },
}

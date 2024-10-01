import { $axios } from "shared/config/axios"
import { stringifiedParams } from "shared/lib/utils"
import { IParams } from "entities/category/api/types"
import { CategoryDto, CategorySchemas } from "shared/types/category"
import { validation } from "shared/lib/validation"

const URL = "/categories"

export const categoriesApi = {
  getAll: (params: IParams) => (
    $axios.get<CategoryDto.GetAllCategoriesResponse>(
      `${URL}${stringifiedParams(params)}`,
    )
      .then(({ data }) => (
        validation(
          CategorySchemas.getCategoriesResponse,
          data,
        ) as CategoryDto.GetAllCategoriesResponse
      ))
  ),

  getById: ({ categoryId }: { categoryId: number }) => (
    $axios.get<CategoryDto.CategoryDto>(`${URL}/${categoryId}`)
      .then(({ data }) => (
        data
      ))
  ),
}

import { $axios } from "shared/config/axios"
import { stringifiedParams } from "shared/lib/utils"
import { IParams } from "entities/category/api/types"
import { CategoryDto } from "shared/types/category"

const URL = "/categories"

export const categoriesApi = {
  getAll: (params: IParams) => (
    $axios.get(`${URL}${stringifiedParams(params)}`)
      .then(({ data }) => data)
  ),

  getById: ({ categoryId }: { categoryId: number }) => (
    $axios.get<CategoryDto.CategoryDto>(`${URL}/${categoryId}`).then(({ data }) => (
      data
    ))
  ),
}

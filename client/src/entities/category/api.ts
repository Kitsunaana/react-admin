import { $axios } from "shared/config/axios"
import { GetAllCategoriesResponse, GetByIdCategoryResponse } from "shared/types/new_types/types"

export interface IParams {
  search?: string | null
  page?: number | null
}

const getAll = async (params: IParams): Promise<GetAllCategoriesResponse> => {
  const { data } = await $axios.get("/categories", { params })

  return data
}

interface GetByIdParams {
  categoryId: string
}

const getById = async (params: GetByIdParams): Promise<GetByIdCategoryResponse> => {
  const { categoryId } = params

  const { data } = await $axios.get(`/categories/${categoryId}`)

  return data
}

export const categoriesApi = {
  getAll,
  getById,
}

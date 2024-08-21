import { $axios } from "shared/config/axios"
import { stringifiedParams } from "shared/lib/utils"
import { IParams } from "entities/category/api/types"

const URL = "/categories"

export const categoriesApi = {
  getAll: (params: IParams) => (
    $axios.get(`${URL}${stringifiedParams(params)}`)
      .then(({ data }) => data)
  ),

  getById: (id: number) => (
    $axios.get(`${URL}/${id}`).then(({ data }) => data)
  ),
}

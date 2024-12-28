import { $axios } from "shared/config/axios"
import {
  Category,
  CategoryCreated,
  CategoryView,
} from "shared/types/new_types/types"

const remove = async (id: string) => $axios
  .delete(`/categories/${id}`).then(({ data }) => data)

const create = async (payload: Omit<CategoryCreated, "id" | "order">): Promise<CategoryView> => {
  const { data } = await $axios.post("/categories", payload)

  return data as CategoryView
}

export type PatchCategoryBody = Category

const update = async (payload: PatchCategoryBody): Promise<CategoryView> => {
  const { data } = await $axios.patch(`/categories/${payload.id}`, payload)

  return data
}

interface ChangeOrderBody {
  id: string
  order: number
}

const changeOrder = async (payload: ChangeOrderBody): Promise<number[]> => {
  const { data } = await $axios
    .patch<number[]>("/categories/order", payload)

  return data
}

export const categoryApi = {
  remove,
  create,
  update,
  changeOrder,
}

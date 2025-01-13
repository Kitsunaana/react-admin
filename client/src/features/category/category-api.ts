import { $axios } from "shared/config/axios"
import { validation } from "shared/lib/validation"
import {
  getAllCategoriesResponse,
  getByIdCategorySchema,
  patchCategoryBodySchema,
  patchCategoryResponseSchema,
  patchChangeOrderResponse,
  postCategoryBodySchema,
  postCategoryResponseSchema,
} from "./domain/category/requests-schemas"
import {
  CreateCategoryBody,
  CreateCategoryResponse,
  GetAllCategoriesResponse,
  GetByIdCategoryResponse,
  PatchCategoryBody,
  PatchCategoryResponse,
  PatchChangeOrderBody,
  PatchChangeOrderResponse,
} from "./domain/category/requests"

const remove = (id: string) => $axios.delete(`/categories/${id}`)

const create = (payload: CreateCategoryBody): Promise<CreateCategoryResponse> => (
  $axios.post("/categories", validation(postCategoryBodySchema, payload))
    .then((response) => validation(postCategoryResponseSchema, response.data))
)

const update = (payload: PatchCategoryBody): Promise<PatchCategoryResponse> => (
  $axios.patch(`/categories/${payload.id}`, validation(patchCategoryBodySchema, payload))
    .then((response) => validation(patchCategoryResponseSchema, response.data))
)

const changeOrder = (payload: PatchChangeOrderBody): Promise<PatchChangeOrderResponse> => (
  $axios.patch("/categories/order", payload)
    .then((response) => validation(patchChangeOrderResponse, response.data))
)

export type GetAllQueryParams = {
  search?: string | null
  page?: number | null
}

const getAll = (query: GetAllQueryParams): Promise<GetAllCategoriesResponse> => (
  $axios.get("/categories", { params: query })
    .then((response) => (
      validation(getAllCategoriesResponse, response.data)
    ))
)

const getById = (id: string): Promise<GetByIdCategoryResponse> => (
  $axios.get(`/categories/${id}`)
    .then((response) => (
      validation(getByIdCategorySchema, response.data)
    ))
)

export const categoryApi = {
  remove,
  create,
  update,
  getAll,
  getById,
  changeOrder,
}

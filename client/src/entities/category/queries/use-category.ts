import { useQuery } from "@tanstack/react-query"
import { UseQueryOptions } from "@tanstack/react-query/build/modern"
import { categoriesApi } from "entities/category/api/categories-api"

export const getByIdCategoryOptions = (id: number | null): UseQueryOptions => ({
  enabled: id !== null,
  queryKey: ["category", id],
  queryFn: () => categoriesApi.getById(id as number),
})

export const useGetByIdCategory = (id: number) => useQuery(getByIdCategoryOptions(id))

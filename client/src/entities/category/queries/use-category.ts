import { useQuery } from "@tanstack/react-query"
import { $axios } from "shared/config/axios"
import { UseQueryOptions } from "@tanstack/react-query/build/modern"

export const getByIdCategoryOptions = (id: number | null): UseQueryOptions => ({
  enabled: id !== null,
  queryKey: ["category", id],
  queryFn: () => $axios.get(`/categories/${id}`)
    .then(({ data }) => data),
  staleTime: 0,
})

export const useGetByIdCategory = (id: number) => useQuery(getByIdCategoryOptions(id))

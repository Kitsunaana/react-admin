import { useQuery } from "@tanstack/react-query"
import { categoriesApi } from "../api"
import { useGetParams } from "../model/use-get-params"

export const useGetAll = () => {
  const { page, search } = useGetParams()

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["categories", search, page],
    queryFn: () => categoriesApi.getAll({ page, search }),
  })

  return {
    categories: data,
    isLoading: isFetching,
    refetch,
  }
}

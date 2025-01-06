import { useQuery } from "@tanstack/react-query"
import { useGetCategorySearchParams } from "entities/category"
import { categoryApi } from "../../category-api"

export const useGetAllCategories = () => {
  const { page, search } = useGetCategorySearchParams()

  const query = useQuery({
    queryKey: ["categories", search, page],
    queryFn: () => categoryApi.getAll({ page, search }),
  })

  return {
    categories: query.data,
    isLoading: query.isFetching,
    refetch: query.refetch,
  }
}

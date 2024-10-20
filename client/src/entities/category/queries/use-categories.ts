import { useQuery } from "@tanstack/react-query"
import { categoriesApi } from "../api/categories-api"
import { useCategorySearchParams } from "../model/use-category-search-params"

export const useCategories = () => {
  const { page, search } = useCategorySearchParams()

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["categories", search, page],
    queryFn: () => categoriesApi.getAll({ page, search }),
  })

  return {
    categories: data,
    isLoadingCategories: isFetching,
    refetchCategories: refetch,
  }
}

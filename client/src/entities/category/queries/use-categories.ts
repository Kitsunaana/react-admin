import { useQuery } from "@tanstack/react-query"
import { categoriesUrlStore } from "entities/category"
import { categoriesApi } from "entities/category/api/categories-api"

export const useCategories = () => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["categories", categoriesUrlStore.searchParams],
    queryFn: () => categoriesApi.getAll({
      page: categoriesUrlStore.page,
      search: categoriesUrlStore.searchParams,
    }),
  })

  return {
    categories: data,
    isLoadingCategories: isFetching,
    refetchCategories: refetch,
  }
}

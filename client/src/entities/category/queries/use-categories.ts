import { useQuery } from "@tanstack/react-query"
import { categoryUrlStore } from "../model/category-url-store"
import { categoriesApi } from "../api/categories-api"

export const useCategories = () => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["categories", categoryUrlStore.searchParams],
    queryFn: () => categoriesApi.getAll({
      page: categoryUrlStore.page,
      search: categoryUrlStore.searchParams,
    }),
  })

  return {
    categories: data,
    isLoadingCategories: isFetching,
    refetchCategories: refetch,
  }
}

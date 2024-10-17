import { useQuery } from "@tanstack/react-query"
import { validation } from "shared/lib/validation"
import { categoriesApi } from "../api/categories-api"
import { categoryUrlStore } from "../model/category-url-store"
import { searchParamsSchema } from "../model/schemas"

export const useCategories = () => {
  const searchParams = validation(searchParamsSchema, categoryUrlStore.getSearchParamsRecord())

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["categories", categoryUrlStore.searchParams],
    queryFn: () => categoriesApi.getAll({
      page: categoryUrlStore.page,
      ...searchParams,
    }),
  })

  return {
    categories: data,
    isLoadingCategories: isFetching,
    refetchCategories: refetch,
  }
}

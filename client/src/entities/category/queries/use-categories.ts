import { useQuery } from "@tanstack/react-query"
import { categoriesApi } from "entities/category/api/categories-api"
import { IParams } from "entities/category/api/types"

export const useCategories = (options: IParams) => {
  const { search, page } = options

  const {
    data, isLoading, isFetching, error, refetch,
  } = useQuery({
    queryKey: ["categories", search, page],
    queryFn: () => categoriesApi.getAll(options),
  })

  return {
    categoriesData: data,
    categoriesError: error,
    categoriesIsLoading: isLoading || isFetching,
    refetchCategories: refetch,
  }
}

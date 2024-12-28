import { useQuery } from "@tanstack/react-query"
import { categoriesApi } from "../api"

export const useGetCategory = (id: string | null) => {
  const { data, isPending, isFetching } = useQuery({
    enabled: id !== null,
    queryKey: ["category", id],
    queryFn: () => categoriesApi.getById({ categoryId: id! }),
  })

  return {
    category: data,
    isLoading: isPending || isFetching,
  }
}

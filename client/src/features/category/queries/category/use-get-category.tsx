import { useQuery } from "@tanstack/react-query"
import { categoryApi } from "../../category-api"

export const useGetCategory = (id: string) => {
  const query = useQuery({
    queryKey: ["category", id],
    queryFn: () => categoryApi.getById(id),
  })

  return {
    category: query.data,
    isLoading: query.isLoading,
  }
}

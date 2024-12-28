import { useQuery } from "@tanstack/react-query"
import { tagApi } from "../api"

export const useGetAll = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: tagApi.getAll,
  })

  return {
    data: data || [],
    isLoading,
  }
}

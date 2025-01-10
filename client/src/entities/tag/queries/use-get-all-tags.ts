import { useQuery } from "@tanstack/react-query"
import { tagApi } from "../api"

export const useGetAllTags = () => {
  const query = useQuery({
    queryKey: ["tags"],
    queryFn: tagApi.getAllTags,
  })

  return {
    data: query.data || [],
    isLoading: query.isLoading,
  }
}

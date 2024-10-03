import { useQuery } from "@tanstack/react-query"
import { tagApi } from "../api/tag-api"

export const useTags = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: tagApi.getAll,
  })

  return {
    tags: data,
    isLoadingGet: isLoading,
  }
}

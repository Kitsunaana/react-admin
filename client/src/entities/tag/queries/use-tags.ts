import { useQuery } from "@tanstack/react-query"
import { tagApi } from "../api/tag-api"

export const useTags = () => {
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["tags"],
    queryFn: tagApi.getAll,
  })

  return {
    tagsData: data,
    tagsIsLoading: isLoading || isPending,
  }
}

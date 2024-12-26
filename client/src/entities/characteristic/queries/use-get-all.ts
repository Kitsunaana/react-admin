import { useQuery } from "@tanstack/react-query"
import { characteristicsApi } from "../api"

export const useGetAll = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["characteristics"],
    queryFn: characteristicsApi.getAll,
  })

  return {
    data: data || [],
    captions: (data || []).map((c) => c.caption),
    isLoading,
  }
}

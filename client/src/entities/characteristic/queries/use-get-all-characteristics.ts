import { useQuery } from "@tanstack/react-query"
import { characteristicsApi } from "../api"

export const useGetAllCharacteristics = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["characteristics"],
    queryFn: characteristicsApi.getAllCharacteristics,
  })

  const captions = data.map((c) => c.caption)

  return {
    isLoading,
    captions,
    data,
  }
}

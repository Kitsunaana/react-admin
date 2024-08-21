import { useQuery } from "@tanstack/react-query"
import { characteristicsApi } from "../api/characteristics-api"

export const useGetCharacteristics = () => {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["characteristics"],
    queryFn: characteristicsApi.getAll,
  })

  return {
    characteristics: data,
    characteristicsIsLoading: isLoading || isFetching,
  }
}

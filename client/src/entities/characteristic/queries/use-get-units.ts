import { useQuery } from "@tanstack/react-query"
import { characteristicsApi } from "../api/characteristics-api"

export const useGetUnits = () => {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["units"],
    queryFn: characteristicsApi.getAllUnits,
  })

  return {
    units: data,
    unitsIsLoading: isLoading || isFetching,
  }
}

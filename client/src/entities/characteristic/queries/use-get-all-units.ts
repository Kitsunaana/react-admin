import { useQuery } from "@tanstack/react-query"
import { characteristicsApi } from "../api"

export const useGetAllUnits = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["units"],
    queryFn: characteristicsApi.getAllUnits,
  })

  const units = data.filter((unit): unit is { id: string; caption: string } => Boolean(unit.caption))

  const captions = units.map((unit) => unit.caption)

  return {
    data: units,
    captions,
    isLoading,
  }
}

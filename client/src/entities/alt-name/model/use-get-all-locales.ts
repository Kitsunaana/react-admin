import { useQuery } from "@tanstack/react-query"
import { altNameApi } from "../api"

export const useGetAllLocales = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["locales"],
    queryFn: altNameApi.getAllLocales,
  })

  return {
    data: data || [],
    isLoading,
  }
}

import { useQuery } from "@tanstack/react-query"
import { altNameApi } from "../api"

export const useLocales = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["locales"],
    queryFn: altNameApi.getAll,
    placeholderData: [],
  })

  return {
    data: data || [],
    isLoading,
  }
}

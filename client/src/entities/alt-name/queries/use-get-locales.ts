import { useQuery } from "@tanstack/react-query"
import { altNameApi } from "entities/alt-name/api/alt-name-api"

export const useLocales = () => {
  const { data } = useQuery({
    queryKey: ["locales"],
    queryFn: altNameApi.getAll,
    placeholderData: [],
  })

  return { locales: data }
}

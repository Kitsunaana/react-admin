import { useQuery } from "@tanstack/react-query"
import { validation } from "shared/lib/validation"
import { altNameApi } from "../api/alt-name-api"
import { Locale } from "../model/types"
import { localesSchema } from "../model/schemas"

export const useGetLocales = () => {
  const { data, isLoading, isFetching } = useQuery<Locale[]>({
    queryKey: ["locales"],
    queryFn: altNameApi.getAll,
  })

  validation(localesSchema, data)

  return {
    localesData: data,
    localesIsLoading: isLoading || isFetching,
  }
}

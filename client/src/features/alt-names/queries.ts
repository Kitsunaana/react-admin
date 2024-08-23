import { useQuery } from "@tanstack/react-query"
import { $axios } from "shared/config/axios"

export const useGetLocales = () => {
  const { data, isLoading, isFetching } = useQuery<any[]>({
    queryKey: ["locales"],
    queryFn: () => $axios.get("/api/locales").then(({ data }) => data),
  })

  return {
    localesData: data,
    localesIsLoading: isLoading || isFetching,
  }
}

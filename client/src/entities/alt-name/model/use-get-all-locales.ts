import { useQuery } from "@tanstack/react-query"
import { altNameApi } from "../api"

export const useGetAllLocales = () => useQuery({
  queryKey: ["locales"],
  queryFn: altNameApi.getAllLocales,
  placeholderData: [],
})

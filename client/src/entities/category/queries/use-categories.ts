import { useQuery } from "@tanstack/react-query"
import { $axios } from "shared/config/axios"

export const useCategories = () => {
  const {
    isLoading, data, error, isError, isFetching, isSuccess, refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => $axios.get("/categories").then(({ data }) => data),
  })

  return {
    data, isSuccess, isLoading, isError, error, isFetching, refetch,
  }
}

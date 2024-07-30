import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useCategories = () => {
  const {
    isLoading, data, error, isError, isFetching, isSuccess,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => axios.get("http://localhost:3333/categories").then((response) => {
      if (response?.data) return response.data
      return []
    }),
  })

  return {
    data, isSuccess, isLoading, isError, error, isFetching,
  }
}

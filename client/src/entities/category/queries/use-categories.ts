import { useQuery } from "@tanstack/react-query"
import { $axios } from "shared/config/axios"

interface UseCategoriesOptions {
  search?: string | null
  page?: number | null | string
}

const stringifiedParams = <TParams extends object>(data: TParams) => {
  const newData = Object.entries(data).reduce((prev, [key, value]) => {
    if (value) prev[key] = value
    return prev
  }, {})

  const searchParams = (new URLSearchParams(newData)).toString()
  return searchParams && `?${searchParams}`
}

export const useCategories = (options: UseCategoriesOptions) => {
  const { search, page } = options

  console.log(["categories", search, page])
  const {
    isLoading, data, error, isError, isFetching, isSuccess, refetch,
  } = useQuery({
    queryKey: ["categories", search, page],
    queryFn: () => $axios.get(`/categories${stringifiedParams(options)}`).then(({ data }) => data),
  })

  return {
    data, isSuccess, isLoading, isError, error, isFetching, refetch,
  }
}

import { useQuery } from "@tanstack/react-query"
import { $axios } from "shared/config/axios"

export const useCategory = (id: number) => useQuery({
  queryKey: ["category", id],
  queryFn: () => $axios.get(`/categories/${id}`).then(({ data }) => data),
})

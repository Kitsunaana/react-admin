import { useQuery } from "@tanstack/react-query"
import { useGetCategorySearchParams } from "entities/category"
import { categoryApi } from "../../category-api"

export type RemoveCategoryData = {
  id: string
  caption: string
}

export const useGetAllCategories = () => {
  const { page, search } = useGetCategorySearchParams()

  const { data, ...other } = useQuery({
    queryKey: ["categories", search, page],
    queryFn: () => categoryApi.getAll({ page, search }),
    placeholderData: {
      rows: [],
      count: 0,
    },
  })

  return {
    ...other,
    categories: data!,
  }
}

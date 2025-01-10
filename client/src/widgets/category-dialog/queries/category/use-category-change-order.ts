import { useMutation } from "@tanstack/react-query"
import { queryClient } from "app/providers/query-client"
import { useGetCategorySearchParams } from "entities/category"
import { categoryApi } from "../../category-api"
import { GetAllCategoriesResponse } from "../../domain/category/requests"

const changeItemOrder = <T extends { order: number, id: string }>(categories: T[], data: T) => (
  categories.map((category) => (
    category.id !== data.id
      ? category
      : {
        ...category,
        order: data.order,
      }
  ))
)

const sortByOrder = <T extends { order: number, id: string }>(categories: T[]) => categories
  .sort((prev, next) => {
    const prevOrder = prev.order ?? 0
    const nextOrder = next.order ?? 0

    if (prevOrder < nextOrder) return 1
    if (prevOrder > nextOrder) return -1
    return 0
  })

export const useChangeCategoryOrder = () => {
  const { search, page } = useGetCategorySearchParams()

  const { mutate, isPending } = useMutation({
    mutationKey: ["categories"],
    mutationFn: categoryApi.changeOrder,
    onSuccess: (_, variables) => {
      queryClient.setQueryData(["categories", search, page], (oldData: GetAllCategoriesResponse) => ({
        ...oldData,
        rows: sortByOrder(
          changeItemOrder(oldData.rows, variables),
        ),
      }))
    },
  })

  return {
    isLoading: isPending,
    mutate,
  }
}

import { useMutation } from "@tanstack/react-query"
import { queryClient } from "app/providers/query-client"
import { useGetCategorySearchParams } from "entities/category"
import { CategoryView, GetAllCategoriesResponse } from "shared/types/new_types/types"
import { categoryApi } from "../category-api"

const changeItemOrder = (categories: CategoryView[], data: { order: number, id: string }) => (
  categories.map((category) => (
    category.id !== data.id
      ? category
      : {
        ...category,
        order: data.order,
      }
  ))
)

const sortByOrder = (categories: CategoryView[]) => categories
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
    onChangeOrder: mutate,
    isLoading: isPending,
  }
}

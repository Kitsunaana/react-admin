import { useCategorySearchParams } from "entities/category/model/use-category-search-params"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "app/providers/query-client"
import { CategoryDto } from "shared/types/category"
import { categoriesApi } from "features/categories/dialog/api/categories-api"

export const useUpdatePosition = () => {
  const { search, page } = useCategorySearchParams()

  const { mutate, isPending } = useMutation({
    mutationKey: ["categories"],
    mutationFn: categoriesApi.updatePosition,
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ["categories", search, page],
        (oldData: CategoryDto.GetAllCategoriesResponse) => ({
          ...oldData,
          rows: oldData.rows
            .map((category) => (
              category.id === variables.id
                ? { ...category, order: variables.order }
                : category))
            .sort((prev, next) => {
              const prevOrder = prev.order ?? 0
              const nextOrder = next.order ?? 0

              if (prevOrder < nextOrder) return 1
              if (prevOrder > nextOrder) return -1
              return 0
            }),
        }),
      )
    },
  })

  return {
    onUpdatePosition: mutate,
    isLoadingUpdate: isPending,
  }
}

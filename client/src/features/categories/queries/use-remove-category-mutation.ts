import { useMutation } from "@tanstack/react-query"
import { queryClient } from "app/providers/query-client"
import { categoryUrlStore } from "entities/category"
import { toast } from "react-toastify"
import { CategoryDto } from "shared/types/category"
import { categoriesApi } from "../api/categories-api"

export const useRemoveCategoryMutation = () => {
  const { mutate } = useMutation({
    mutationKey: ["category"],
    mutationFn: (id: number) => toast.promise(categoriesApi.delete(id), {
      error: "При удаление категории произошла ошибка",
      success: "Категория успешно удалена",
    }),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ["categories", categoryUrlStore.searchParams],
        (oldData: CategoryDto.GetAllCategoriesResponse) => ({
          count: oldData.count - 1,
          rows: oldData.rows.filter((category) => category.id !== variables),
        }),
      )
    },
  })

  return {
    onRemove: mutate,
  }
}

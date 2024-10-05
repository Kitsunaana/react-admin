import { useMutation } from "@tanstack/react-query"
import { $axios } from "shared/config/axios"
import { useGetConfirmation } from "shared/lib/confirmation"
import { queryClient } from "app/providers/query-client"
import { categoriesUrlStore } from "entities/category"
import { CategoryDto } from "shared/types/category"
import { toast } from "react-toastify"

export const deleteCategory = (id: number | null): Promise<[]> => (
  $axios.delete(`/categories/${id}`).then(({ data }) => data)
)

export const useRemoveCategoryMutation = () => {
  const { mutate } = useMutation({
    mutationKey: ["category"],
    mutationFn: (id: number) => toast.promise(deleteCategory(id), {
      error: "При удаление категории произошла ошибка",
      success: "Категория успешно удалена",
    }),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ["categories", categoriesUrlStore.searchParams],
        (oldData: CategoryDto.GetAllCategoriesResponse) => ({
          ...oldData,
          rows: oldData.rows.filter((category) => category.id !== variables),
        } as CategoryDto.GetAllCategoriesResponse),
      )
    },
  })

  return {
    onRemove: mutate,
  }
}

export const useRemoveCategory = () => {
  const getConfirmation = useGetConfirmation()
  const { onRemove } = useRemoveCategoryMutation()

  return async (categoryId: number | null) => {
    const confirmation = await getConfirmation({
      description: "Вы действительно хотите удалить категорию",
      confirmText: "Удалить",
    })

    if (confirmation && categoryId !== null) onRemove(categoryId)
  }
}

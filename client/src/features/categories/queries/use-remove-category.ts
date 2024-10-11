import { useGetConfirmation } from "shared/lib/confirmation"
import { useRemoveCategoryMutation } from "./use-remove-category-mutation"

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

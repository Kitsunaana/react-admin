import { useGetConfirmation } from "shared/lib/confirmation"
import { useRemoveCategoryMutation } from "../queries/category/use-category-remove"
import { RemoveConfirm } from "../ui/remove-confirm"

export const useRemoveCategory = () => {
  const langBase = "catalog.confirm.remove"

  const getConfirmation = useGetConfirmation()
  const { onRemove } = useRemoveCategoryMutation()

  return async <T extends { id: string, caption: string }>(category: T) => {
    const confirmation = await getConfirmation({
      langBase,
      confirmText: "confirm",
      description: (
        <RemoveConfirm
          langBase={langBase}
          category={category}
        />
      ),
    })

    if (confirmation) onRemove(category.id)
  }
}

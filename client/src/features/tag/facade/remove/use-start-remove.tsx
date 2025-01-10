import { useGetConfirmation } from "shared/lib/confirmation"
import { Tag } from "entities/tag"
import { RemoveConfirm } from "../../ui/remove-confirm"

export const useStartRemove = () => {
  const langBase = "tag.confirm.remove"
  const getConfirmation = useGetConfirmation()

  return async (tag: Tag, handleRemove: (id: string) => void) => {
    const confirmation = await getConfirmation({
      langBase,
      confirmText: "confirm",
      description: (
        <RemoveConfirm
          langBase={langBase}
          tag={tag}
        />
      ),
    })

    if (confirmation) handleRemove(tag.id)
  }
}

import { useGetConfirmation } from "shared/lib/confirmation"
import { useStores } from "features/categories/model/context"

export const useRemoveAltName = () => {
  const getConfirmation = useGetConfirmation()
  const { altNames } = useStores()

  return async (id: string | number, caption: string) => {
    const confirmation = await getConfirmation({
      description: caption,
    })

    if (confirmation) altNames.remove(id)
  }
}

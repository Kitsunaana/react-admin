import { useGetConfirmation } from "shared/lib/confirmation"

export const useRemoveTag = (onRemove: (id: number | string) => void) => {
  const getConfirmation = useGetConfirmation()

  return async (id: number | string, caption: string) => {
    const confirmation = await getConfirmation({
      description: caption,
    })

    if (confirmation) onRemove(id)
  }
}
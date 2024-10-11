import { useGetConfirmation } from "shared/lib/confirmation"

export const useRemoveAltName = (remove: (id: number | string) => void) => {
  const getConfirmation = useGetConfirmation()

  return async (id: string | number, caption: string) => {
    const confirmation = await getConfirmation({
      description: caption,
    })

    if (confirmation) remove(id)
  }
}

import { useGetConfirmation } from "shared/lib/confirmation"
import { Text } from "shared/ui/text"

export const useClearModal = (clear: () => void) => {
  const langBase = "catalog.confirm.clear"
  const getConfirmation = useGetConfirmation()

  return async () => {
    const confirmation = await getConfirmation({
      langBase,
      description: <Text langBase={langBase} name="description" />,
      confirmText: "confirm",
    })

    if (confirmation) clear()
  }
}

import { UseSetValuesClear } from "shared/hooks/use-set-dialog-values"
import { useGetConfirmation } from "shared/lib/confirmation"
import { Text } from "shared/ui/text"

export const useClearDialog = () => {
  const langBase = "catalog.confirm.clear"
  const getConfirmation = useGetConfirmation()

  return async (callback: UseSetValuesClear) => {
    const confirmation = await getConfirmation({
      langBase,
      description: <Text langBase={langBase} name="description" />,
      confirmText: "confirm",
    })

    if (confirmation) callback()
  }
}

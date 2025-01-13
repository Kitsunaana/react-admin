import { useGetConfirmation } from "shared/lib/confirmation"
import { Characteristic } from "entities/characteristic"
import { RemoveConfirm } from "../../ui/remove-confirm"

export const useStartRemove = () => {
  const langBase = "characteristic.confirm.remove"
  const getConfirmation = useGetConfirmation()

  return async (characteristic: Characteristic, handleRemove: (id: string) => void) => {
    const confirmation = await getConfirmation({
      langBase,
      confirmText: "confirm",
      description: (
        <RemoveConfirm
          langBase={langBase}
          data={characteristic}
        />
      ),
    })

    if (confirmation) handleRemove(characteristic.id)
  }
}

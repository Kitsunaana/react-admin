import { useGetConfirmation } from "shared/lib/confirmation"
import { useLang } from "shared/context/lang"
import { RemoveConfirm } from "../ui/remove-confirm"
import { Characteristic } from "../domain/types"

export const useStartRemove = () => {
  const langBaseRoot = useLang()
  const getConfirmation = useGetConfirmation()

  return async (characteristic: Characteristic, handleRemove: (id: string) => void) => {
    const langBase = `${langBaseRoot}.confirm.remove`

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

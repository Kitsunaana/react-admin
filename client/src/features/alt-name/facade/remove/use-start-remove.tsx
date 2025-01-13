import { useGetConfirmation } from "shared/lib/confirmation"
import { AltName } from "entities/alt-name"
import { RemoveConfirm } from "../../ui/remove-confirm"

export const useStartRemove = () => {
  const langBase = "altNames.confirm.remove"
  const getConfirmation = useGetConfirmation()

  return async (altName: AltName, remove: (id: string) => void) => {
    const confirmation = await getConfirmation({
      langBase,
      confirmText: "confirm",
      description: (
        <RemoveConfirm
          langBase={langBase}
          altName={altName}
        />
      ),
    })

    if (confirmation) remove(altName.id)
  }
}

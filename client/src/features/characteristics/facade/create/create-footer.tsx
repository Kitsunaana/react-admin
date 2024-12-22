import { SaveButton } from "shared/ui/dialog/save-button"
import { CancelButton } from "shared/ui/dialog/cancel-button"
import { useKeyboard } from "shared/lib/keyboard-manager"
import { characteristicCreateStore } from "../../model/characteristic-create-store"

export const CreateFooter = ({ formId }: { formId: string }) => {
  useKeyboard({
    key: "Escape",
    callback: characteristicCreateStore.cancelCreate,
  })

  return (
    <>
      <SaveButton form={formId} />
      <CancelButton onClick={characteristicCreateStore.cancelCreate} />
    </>
  )
}

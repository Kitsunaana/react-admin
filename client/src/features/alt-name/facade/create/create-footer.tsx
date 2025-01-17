import { SaveButton } from "shared/ui/dialog/save-button"
import { CancelButton } from "shared/ui/dialog/cancel-button"
import { useKeyboard } from "shared/lib/keyboard-manager"
import { altNameCreateStore } from "../../model/create-store"

export const CreateFooter = ({ formId }: { formId: string }) => {
  useKeyboard({
    key: "Escape",
    callback: altNameCreateStore.cancelCreate,
  })

  return (
    <>
      <SaveButton form={formId} />
      <CancelButton onClick={altNameCreateStore.cancelCreate} />
    </>
  )
}

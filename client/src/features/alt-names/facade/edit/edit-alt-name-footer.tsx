import { SaveButton } from "shared/ui/dialog/save-button"
import { CancelButton } from "shared/ui/dialog/cancel-button"
import { useKeyboard } from "shared/lib/keyboard-manager"
import { altNameEditStore } from "../../model/alt-name-edit-store"

export const EditAltNameFooter = ({ formId }: { formId: string }) => {
  useKeyboard({
    key: "Escape",
    callback: altNameEditStore.cancelEdit,
  })

  return (
    <>
      <SaveButton form={formId} />
      <CancelButton onClick={altNameEditStore.cancelEdit} />
    </>
  )
}
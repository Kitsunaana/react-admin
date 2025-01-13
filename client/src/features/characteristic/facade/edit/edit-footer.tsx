import { SaveButton } from "shared/ui/dialog/save-button"
import { CancelButton } from "shared/ui/dialog/cancel-button"
import { useKeyboard } from "shared/lib/keyboard-manager"
import { editStore } from "../../model/edit-store"

export const EditFooter = ({ formId }: { formId: string }) => {
  useKeyboard({
    key: "Escape",
    callback: editStore.cancelEdit,
  })

  return (
    <>
      <SaveButton form={formId} />
      <CancelButton onClick={editStore.cancelEdit} />
    </>
  )
}

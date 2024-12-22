import { SaveButton } from "shared/ui/dialog/save-button"
import { CancelButton } from "shared/ui/dialog/cancel-button"
import { useKeyboard } from "shared/lib/keyboard-manager"
import { tagEditStore } from "../../model/tag-edit-store"

export const EditFooter = ({ formId }: { formId: string }) => {
  useKeyboard({
    key: "Escape",
    callback: tagEditStore.cancelEdit,
  })

  return (
    <>
      <SaveButton form={formId} />
      <CancelButton onClick={tagEditStore.cancelEdit} />
    </>
  )
}

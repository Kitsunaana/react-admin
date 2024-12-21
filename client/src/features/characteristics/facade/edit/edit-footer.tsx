import { useModalKeyboardManage } from "shared/hooks/use-modal-keyboard-manage"
import { SaveButton } from "shared/ui/dialog/save-button"
import { CancelButton } from "shared/ui/dialog/cancel-button"
import { characteristicEditStore } from "../../model/characteristic-edit-store"

export const EditFooter = ({ formId }: { formId: string }) => {
  useModalKeyboardManage({ cancel: characteristicEditStore.cancelEdit })

  return (
    <>
      <SaveButton form={formId} />
      <CancelButton onClick={characteristicEditStore.cancelEdit} />
    </>
  )
}

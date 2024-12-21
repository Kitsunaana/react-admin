import { useModalKeyboardManage } from "shared/hooks/use-modal-keyboard-manage"
import { SaveButton } from "shared/ui/dialog/save-button"
import { CancelButton } from "shared/ui/dialog/cancel-button"
import { characteristicCreateStore } from "../../model/characteristic-create-store"

export const CreateFooter = ({ formId }: { formId: string }) => {
  useModalKeyboardManage({ cancel: characteristicCreateStore.cancelCreate })

  return (
    <>
      <SaveButton form={formId} />
      <CancelButton onClick={characteristicCreateStore.cancelCreate} />
    </>
  )
}

import { SaveButton } from "shared/ui/dialog/save-button"
import { CancelButton } from "shared/ui/dialog/cancel-button"
import { useKeyboard } from "shared/lib/keyboard-manager"
import { createStore } from "../../model/create-store"

export const CreateFooter = ({ formId }: { formId: string }) => {
  useKeyboard({
    key: "Escape",
    callback: createStore.cancelCreate,
  })

  return (
    <>
      <SaveButton form={formId} />
      <CancelButton onClick={createStore.cancelCreate} />
    </>
  )
}

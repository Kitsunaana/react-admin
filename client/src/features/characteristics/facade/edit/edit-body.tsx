import { observer } from "mobx-react-lite"
import { useId } from "react"
import { useModalKeyboardManage } from "shared/hooks/use-modal-keyboard-manage"
import { ModalContainer } from "shared/ui/dialog/upsert-dialog"
import { DialogHeaderCaption, ModalHeader } from "shared/ui/dialog/dialog-header"
import { SaveButton } from "shared/ui/dialog/save-button"
import { CancelButton } from "shared/ui/dialog/cancel-button"
import { characteristicEditStore } from "../../model/characteristic-edit-store"
import { CharacteristicEditForm } from "./edit-form"

export const EditBody = observer(() => {
  const formId = useId()

  useModalKeyboardManage({ cancel: characteristicEditStore.cancelEdit })

  return (
    <ModalContainer
      height="auto"
      body={<CharacteristicEditForm formId={formId} />}
      header={(
        <ModalHeader
          title={(
            <DialogHeaderCaption
              name="edit"
              value={characteristicEditStore.characteristic?.caption}
            />
          )}
        />
      )}
      footer={{
        right: (
          <>
            <SaveButton form={formId} />
            <CancelButton onClick={characteristicEditStore.cancelEdit} />
          </>
        ),
      }}
    />
  )
})

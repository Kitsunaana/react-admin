import { observer } from "mobx-react-lite"
import { useId } from "react"
import { useModalKeyboardManage } from "shared/hooks/use-modal-keyboard-manage"
import { ModalContainer } from "shared/ui/dialog/upsert-dialog"
import { DialogHeaderCaption, ModalHeader } from "shared/ui/dialog/dialog-header"
import { SaveButton } from "shared/ui/dialog/save-button"
import { CancelButton } from "shared/ui/dialog/cancel-button"
import { characteristicCreateStore } from "../../model/characteristic-create-store"
import { CharacteristicCreateForm } from "./create-form"

export const CreateBody = observer(() => {
  const formId = useId()

  useModalKeyboardManage({ cancel: characteristicCreateStore.cancelCreate })

  return (
    <ModalContainer
      height="auto"
      body={<CharacteristicCreateForm formId={formId} />}
      header={<ModalHeader title={<DialogHeaderCaption name="create" />} />}
      footer={{
        right: (
          <>
            <SaveButton form={formId} />
            <CancelButton onClick={characteristicCreateStore.cancelCreate} />
          </>
        ),
      }}
    />
  )
})

import { observer } from "mobx-react-lite"
import { useId } from "react"
import { ModalContainer } from "shared/ui/dialog/upsert-dialog"
import { DialogHeaderCaption, ModalHeader } from "shared/ui/dialog/dialog-header"
import { characteristicEditStore } from "../../model/characteristic-edit-store"
import { CharacteristicEditForm } from "./edit-form"
import { EditFooter } from "./edit-footer"

export const EditBody = observer(() => {
  const formId = useId()

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
        right: <EditFooter formId={formId} />,
      }}
    />
  )
})

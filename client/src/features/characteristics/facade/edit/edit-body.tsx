import { useId } from "react"
import { ModalContainer } from "shared/ui/dialog/upsert-dialog"
import { DialogHeaderCaption, ModalHeader } from "shared/ui/dialog/dialog-header"
import { editStore } from "../../model/edit-store"
import { CharacteristicEditForm } from "./edit-form"
import { EditFooter } from "./edit-footer"

export const EditBody = () => {
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
              value={editStore.characteristic?.caption}
            />
          )}
        />
      )}
      footer={{
        right: <EditFooter formId={formId} />,
      }}
    />
  )
}

import { observer } from "mobx-react-lite"
import { useId } from "react"
import { ModalContainer } from "shared/ui/dialog/upsert-dialog"
import { DialogHeaderCaption, ModalHeader } from "shared/ui/dialog/dialog-header"
import { EditAltNameForm } from "./edit-alt-name-form"
import { EditAltNameFooter } from "./edit-alt-name-footer"
import { altNameEditStore } from "../../model/alt-name-edit-store"

export const EditAltNameBody = observer(() => {
  const formId = useId()

  return (
    <ModalContainer
      height="auto"
      body={<EditAltNameForm formId={formId} />}
      header={(
        <ModalHeader
          title={(
            <DialogHeaderCaption
              value={altNameEditStore.altName?.caption}
              name="edit"
            />
          )}
        />
      )}
      footer={{
        right: <EditAltNameFooter formId={formId} />,
      }}
    />
  )
})

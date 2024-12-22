import { observer } from "mobx-react-lite"
import { useId } from "react"
import { ModalContainer } from "shared/ui/dialog/upsert-dialog"
import { DialogHeaderCaption, ModalHeader } from "shared/ui/dialog/dialog-header"
import { AltNameEditForm } from "./edit-form"
import { EditFooter } from "./edit-footer"
import { altNameEditStore } from "../../model/alt-name-edit-store"

export const EditBody = observer(() => {
  const formId = useId()

  return (
    <ModalContainer
      height="auto"
      body={<AltNameEditForm formId={formId} />}
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
        right: <EditFooter formId={formId} />,
      }}
    />
  )
})

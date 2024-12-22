import { observer } from "mobx-react-lite"
import { useId } from "react"
import { ModalContainer } from "shared/ui/dialog/upsert-dialog"
import { DialogHeaderCaption, ModalHeader } from "shared/ui/dialog/dialog-header"
import { tagEditStore } from "../../model/tag-edit-store"
import { TagEditForm } from "./edit-form"
import { EditFooter } from "./edit-footer"

export const EditBody = observer(() => {
  const formId = useId()

  return (
    <ModalContainer
      height="auto"
      body={<TagEditForm formId={formId} />}
      header={(
        <ModalHeader
          title={(
            <DialogHeaderCaption
              name="edit"
              value={tagEditStore.tag?.caption}
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

import { observer } from "mobx-react-lite"
import { useId } from "react"
import { ModalContainer } from "shared/ui/dialog/upsert-dialog"
import { DialogHeaderCaption, ModalHeader } from "shared/ui/dialog/dialog-header"
import { TagCreateForm } from "./create-form"
import { CreateFooter } from "./create-footer"

export const CreateBody = observer(() => {
  const formId = useId()

  return (
    <ModalContainer
      height="auto"
      body={<TagCreateForm formId={formId} />}
      header={<ModalHeader title={<DialogHeaderCaption name="create" />} />}
      footer={{
        right: <CreateFooter formId={formId} />,
      }}
    />
  )
})

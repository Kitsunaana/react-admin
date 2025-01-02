import { observer } from "mobx-react-lite"
import { useId } from "react"
import { ModalContainer } from "shared/ui/dialog/upsert-dialog"
import { DialogHeaderCaption, ModalHeader } from "shared/ui/dialog/dialog-header"
import { CreateAltNameForm } from "./create-alt-name-form"
import { CreateAltNameFooter } from "./create-alt-name-footer"

export const CreateAltNameBody = observer(() => {
  const formId = useId()

  return (
    <ModalContainer
      height="auto"
      body={<CreateAltNameForm formId={formId} />}
      header={<ModalHeader title={<DialogHeaderCaption name="create" />} />}
      footer={{
        right: <CreateAltNameFooter formId={formId} />,
      }}
    />
  )
})

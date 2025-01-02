import { observer } from "mobx-react-lite"
import { LangContext } from "shared/context/lang"
import { ModalStoreProvider } from "shared/hooks/use-modal-store"
import { ModalWrapper } from "shared/ui/dialog/upsert-dialog"
import { altNameEditStore } from "../../model/alt-name-edit-store"
import { EditAltNameBody } from "./edit-alt-name-body"

export const EditAltNameModal = observer(() => (
  <LangContext lang="altNames.dialog">
    <ModalStoreProvider>
      <ModalWrapper
        nesting={2}
        open={altNameEditStore.isEditing}
      >
        <EditAltNameBody />
      </ModalWrapper>
    </ModalStoreProvider>
  </LangContext>
))

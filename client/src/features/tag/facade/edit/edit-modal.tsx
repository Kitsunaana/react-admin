import { observer } from "mobx-react-lite"
import { LangContext } from "shared/context/lang"
import { ModalStoreProvider } from "shared/hooks/use-modal-store"
import { ModalWrapper } from "shared/ui/dialog/upsert-dialog"
import { tagEditStore } from "../../model/edit-store"
import { EditBody } from "./edit-body"

export const EditModal = observer(() => (
  <LangContext lang="tag.dialog">
    <ModalStoreProvider>
      <ModalWrapper
        nesting={2}
        open={tagEditStore.isEditing}
      >
        <EditBody />
      </ModalWrapper>
    </ModalStoreProvider>
  </LangContext>
))

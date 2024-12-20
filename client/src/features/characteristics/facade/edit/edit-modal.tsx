import { observer } from "mobx-react-lite"
import { LangContext } from "shared/context/lang"
import { ModalStoreProvider } from "shared/hooks/use-modal-store"
import { ModalWrapper } from "shared/ui/dialog/upsert-dialog"
import { characteristicEditStore } from "../../model/characteristic-edit-store"
import { EditBody } from "./edit-body"

export const EditModal = observer(() => (
  <LangContext lang="characteristic.dialog">
    <ModalStoreProvider>
      <ModalWrapper
        nesting={2}
        open={characteristicEditStore.isEditing}
      >
        <EditBody />
      </ModalWrapper>
    </ModalStoreProvider>
  </LangContext>
))

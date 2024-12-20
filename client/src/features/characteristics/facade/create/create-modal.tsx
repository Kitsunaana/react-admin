import { observer } from "mobx-react-lite"
import { LangContext } from "shared/context/lang"
import { ModalStoreProvider } from "shared/hooks/use-modal-store"
import { ModalWrapper } from "shared/ui/dialog/upsert-dialog"
import { characteristicCreateStore } from "../../model/characteristic-create-store"
import { CreateBody } from "./create-body"

export const CreateModal = observer(() => (
  <LangContext lang="characteristic.dialog">
    <ModalStoreProvider>
      <ModalWrapper
        nesting={2}
        open={characteristicCreateStore.isCreating}
      >
        <CreateBody />
      </ModalWrapper>
    </ModalStoreProvider>
  </LangContext>
))

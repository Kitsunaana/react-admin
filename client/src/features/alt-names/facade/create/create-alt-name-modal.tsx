import { observer } from "mobx-react-lite"
import { LangContext } from "shared/context/lang"
import { ModalStoreProvider } from "shared/hooks/use-modal-store"
import { ModalWrapper } from "shared/ui/dialog/upsert-dialog"
import { altNameCreateStore } from "../../model/alt-name-create-store"
import { CreateAltNameBody } from "./create-alt-name-body"

export const CreateAltNameModal = observer(() => (
  <LangContext lang="altNames.dialog">
    <ModalStoreProvider>
      <ModalWrapper
        nesting={2}
        open={altNameCreateStore.isCreating}
      >
        <CreateAltNameBody />
      </ModalWrapper>
    </ModalStoreProvider>
  </LangContext>
))

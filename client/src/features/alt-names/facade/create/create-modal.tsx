import { observer } from "mobx-react-lite"
import { LangContext } from "shared/context/lang"
import { ModalStoreProvider } from "shared/hooks/use-modal-store"
import { ModalWrapper } from "shared/ui/dialog/upsert-dialog"
import { altNameCreateStore } from "../../model/alt-name-create-store"
import { CreateBody } from "./create-body"

export const CreateModal = observer(() => (
  <LangContext lang="altNames.dialog">
    <ModalStoreProvider>
      <ModalWrapper
        nesting={2}
        open={altNameCreateStore.isCreating}
      >
        <CreateBody />
      </ModalWrapper>
    </ModalStoreProvider>
  </LangContext>
))

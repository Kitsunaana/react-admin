import { observer } from "mobx-react-lite"
import { LangContext } from "shared/context/lang"
import { ModalStoreProvider } from "shared/hooks/use-modal-store"
import { ModalWrapper } from "shared/ui/dialog/upsert-dialog"
import { tagCreateStore } from "../../model/tag-create-store"
import { CreateBody } from "./create-body"

export const CreateModal = observer(() => (
  <LangContext lang="tag.dialog">
    <ModalStoreProvider>
      <ModalWrapper
        nesting={2}
        open={tagCreateStore.isCreating}
      >
        <CreateBody />
      </ModalWrapper>
    </ModalStoreProvider>
  </LangContext>
))

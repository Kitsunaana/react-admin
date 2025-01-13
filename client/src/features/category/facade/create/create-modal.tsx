import { LangContext } from "shared/context/lang"
import { ModalStoreProvider } from "shared/hooks/use-modal-store"
import { ModalWrapper } from "shared/ui/dialog/upsert-dialog"
import { observer } from "mobx-react-lite"
import { ReactNode } from "react"
import { categoryCreateStore } from "../../model/category/category-create-store"
import { CreateBody } from "./create-body"

export const CreateModal = observer(({ modals }: { modals?: ReactNode }) => (
  <>
    <LangContext lang="catalog.dialog">
      <ModalStoreProvider>
        <ModalWrapper open={categoryCreateStore.isCreating}>
          <CreateBody />
        </ModalWrapper>
      </ModalStoreProvider>
    </LangContext>

    {modals}
  </>
))

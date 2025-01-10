import { observer } from "mobx-react-lite"
import { ModalContainer } from "shared/ui/dialog/upsert-dialog"
import { SaveButton } from "shared/ui/dialog/save-button"
import { CancelButton } from "shared/ui/dialog/cancel-button"
import { useId } from "react"
import { CategoryStoreProvider } from "../../model/category/use-category-store"
import { CategoryFormProvider } from "../../view-model/form/use-category-form"
import { TabsContent } from "../../ui/tabs/root"
import { CreateHeader } from "./create-header"
import { ModalFooter } from "../common/modal-footer"
import { categoryCreateStore } from "../../model/category/category-create-store"
import { useCreateCategory } from "../../queries/category/use-category-create"
import { ModalTabs } from "../common/modal-tabs"

export const CreateBody = observer(() => {
  const formId = useId()

  const create = useCreateCategory(categoryCreateStore.cancelCreate)

  return (
    <CategoryStoreProvider>
      <CategoryFormProvider>
        <ModalContainer
          isLoading={create.isLoading}
          header={<CreateHeader />}
          body={<TabsContent formId={formId} onCreate={create.onCreate} />}
          tabs={<ModalTabs />}
          footer={{
            left: <ModalFooter />,
            right: (
              <>
                <SaveButton form={formId} />
                <CancelButton onClick={categoryCreateStore.cancelCreate} />
              </>
            ),
          }}
        />
      </CategoryFormProvider>
    </CategoryStoreProvider>
  )
})

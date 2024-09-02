import { StoreProvider } from "features/categories/model/context"
import { CategoryDeleteDialog } from "./category-delete-dialog"
import { CategoryEditDialog } from "./category-edit-dialog"

export const CategoryDialog = () => (
  <>
    <CategoryDeleteDialog />
    <StoreProvider>
      <CategoryEditDialog />
    </StoreProvider>
  </>
)

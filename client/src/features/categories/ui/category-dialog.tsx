import { StoreProvider } from "features/categories/model/context"
import { CategoryCreateDialog } from "features/categories/ui/category-create-dialog"
import { CategoryDeleteDialog } from "./category-delete-dialog"
import { CategoryEditDialog } from "./category-edit-dialog"

export const CategoryDialog = () => (
  <>
    <CategoryDeleteDialog />
    <StoreProvider>
      <CategoryEditDialog />
      <CategoryCreateDialog />
    </StoreProvider>
  </>
)

import { StoreProvider } from "features/categories/model/context"
import { CategoryCreateDialog } from "features/categories/ui/category-create-dialog"
import { CategoryEditDialog } from "./category-edit-dialog"

export const CategoryDialog = () => (
  <StoreProvider>
    <CategoryEditDialog />
    <CategoryCreateDialog />
  </StoreProvider>
)

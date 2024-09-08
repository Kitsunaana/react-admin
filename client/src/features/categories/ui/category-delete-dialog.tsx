import { DialogDelete as DialogDeleteBase } from "shared/ui/dialog/dialog-delete"
import { UseMutationOptions } from "@tanstack/react-query"
import { queryClient } from "app/providers/query-client"
import { $axios } from "shared/config/axios"
import { categoriesUrlStore } from "entities/category"
import { TCategory } from "features/categories/model/schemas"

export type DeleteCategoryOptions = UseMutationOptions<any, any, number | null>

export const deleteCategory = (id: number | null): Promise<[]> => (
  $axios.delete(`/categories/${id}`).then(({ data }) => data)
)

export const deleteCategoryOptions = (id: number | null): DeleteCategoryOptions => ({
  mutationKey: ["category", id],
  mutationFn: deleteCategory,
  onSuccess: () => {
    queryClient.setQueryData(
      ["categories", categoriesUrlStore.searchParams],
      (oldData: { count: number; rows: TCategory[] }) => ({
        ...oldData,
        rows: oldData.rows.filter((category) => category.id !== id),
      }),
    )
  },
})

export const CategoryDeleteDialog = () => (
  <DialogDeleteBase
    langBase="catalog"
    onDeleteOptions={deleteCategoryOptions}
  />
)

import { DialogDelete as DialogDeleteBase } from "shared/ui/dialog/dialog-delete"
import { UseMutationOptions } from "@tanstack/react-query"
import { $axios } from "shared/config/axios"
import { queryClient } from "app/providers/query-client"
import { useSearchParams } from "react-router-dom"

export type DeleteCategoryOptions = UseMutationOptions<any, any, number>

export const deleteCategoryOptions = (params: URLSearchParams) => (id: number): DeleteCategoryOptions => ({
  mutationKey: ["category", id],
  mutationFn: (id: number | null) => $axios.delete(`/categories/${id}`),
  onSuccess: () => {
    const search = params.get("search")
    const page = params.get("page") ?? 1

    queryClient.setQueryData(["categories", search, page], (oldData: {rows: any[]}) => ({
      ...oldData,
      rows: oldData.rows.filter((category) => category.id !== id),
    }))
  },
})

export const DialogDelete = () => {
  const [searchParams] = useSearchParams()

  return (
    <DialogDeleteBase
      langBase="catalog"
      onDeleteOptions={deleteCategoryOptions(searchParams)}
    />
  )
}

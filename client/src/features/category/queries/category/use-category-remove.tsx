import { useMutation } from "@tanstack/react-query"
import { queryClient } from "app/providers/query-client"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import { useGetCategorySearchParams } from "entities/category"
import { categoryApi } from "../../category-api"
import { GetAllCategoriesResponse } from "../../domain/category/requests"

export const useRemoveCategoryMutation = () => {
  const { t } = useTranslation("translation", { keyPrefix: "catalog.dialog.remove" })

  const { search, page } = useGetCategorySearchParams()

  const mutation = useMutation({
    mutationKey: ["category"],
    mutationFn: (id: string) => (
      toast.promise(categoryApi.remove(id), {
        error: t("error"),
        success: {
          type: "info",
          render: t("success"),
        },
      })
    ),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ["categories", search, page],
        (oldData: GetAllCategoriesResponse) => ({
          count: oldData.count - 1,
          rows: oldData.rows.filter((category) => category.id !== variables),
        }),
      )
    },
  })

  return {
    onRemove: mutation.mutate,
  }
}

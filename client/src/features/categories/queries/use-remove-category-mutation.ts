import { useMutation } from "@tanstack/react-query"
import { queryClient } from "app/providers/query-client"
import { useCategorySearchParams } from "entities/category/model/use-category-search-params"
import { toast } from "react-toastify"
import { CategoryDto } from "shared/types/category"
import { useTranslation } from "react-i18next"
import { categoriesApi } from "../api/categories-api"

export const useRemoveCategoryMutation = () => {
  const { t } = useTranslation("translation", { keyPrefix: "catalog.dialog.remove" })

  const { search, page } = useCategorySearchParams()

  const { mutate } = useMutation({
    mutationKey: ["category"],
    mutationFn: (id: number) => toast.promise(categoriesApi.delete(id), {
      error: t("error"),
      success: { type: "info", render: t("success") },
    }),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ["categories", search, page],
        (oldData: CategoryDto.GetAllCategoriesResponse) => ({
          count: oldData.count - 1,
          rows: oldData.rows.filter((category) => category.id !== variables),
        }),
      )
    },
  })

  return {
    onRemove: mutate,
  }
}

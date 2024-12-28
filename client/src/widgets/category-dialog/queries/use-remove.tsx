import { useMutation } from "@tanstack/react-query"
import { queryClient } from "app/providers/query-client"
import { useGetParams } from "entities/category/model/use-get-params"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import { useGetConfirmation } from "shared/lib/confirmation"
import { CategoryView, GetAllCategoriesResponse } from "shared/types/new_types/types"
import { categoryApi } from "../category-api"
import { RemoveConfirm } from "../ui/remove-confirm"

export const useRemoveCategoryMutation = () => {
  const { t } = useTranslation("translation", { keyPrefix: "catalog.dialog.remove" })

  const { search, page } = useGetParams()

  const { mutate } = useMutation({
    mutationKey: ["category"],
    mutationFn: (id: string) => toast.promise(categoryApi.remove(id), {
      error: t("error"),
      success: { type: "info", render: t("success") },
    }),
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
    onRemove: mutate,
  }
}

export const useRemoveCategory = () => {
  const langBase = "catalog.confirm.remove"

  const getConfirmation = useGetConfirmation()
  const { onRemove } = useRemoveCategoryMutation()

  return async (category: CategoryView) => {
    const confirmation = await getConfirmation({
      langBase,
      confirmText: "confirm",
      description: (
        <RemoveConfirm
          langBase={langBase}
          category={category}
        />
      ),
    })

    if (confirmation) onRemove(category.id)
  }
}

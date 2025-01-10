import { useMutation } from "@tanstack/react-query"
import { queryClient } from "app/providers/query-client"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import { useLang } from "shared/context/lang"

import { sleep } from "shared/lib/utils"
import { useGetCategorySearchParams } from "entities/category"
import { categoryApi } from "../../category-api"
import { CreateCategoryBody, GetAllCategoriesResponse } from "../../domain/category/requests"

export const useCreateCategory = (onSuccess: () => void) => {
  const langBase = useLang("create")
  const { t } = useTranslation("translation", { keyPrefix: langBase })

  const { search, page } = useGetCategorySearchParams()

  const mutation = useMutation({
    mutationKey: ["categories"],
    mutationFn: (body: CreateCategoryBody) => (
      toast.promise(sleep(1000).then(() => categoryApi.create(body)), {
        success: t("success"),
        pending: t("pending"),
        error: t("error"),
      })
    ),
    onSuccess: (data) => {
      onSuccess()

      queryClient.setQueryData(["categories", search, page], (oldData: GetAllCategoriesResponse) => ({
        count: oldData.count + 1,
        rows: oldData.rows.concat([data]),
      }))
    },
  })

  return {
    onCreate: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
  }
}

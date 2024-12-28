import { useMutation } from "@tanstack/react-query"
import { queryClient } from "app/providers/query-client"
import { useGetParams } from "entities/category/model/use-get-params"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import { useLang } from "shared/context/lang"
import {
  CategoryWithImages,
  GetAllCategoriesResponse,
} from "shared/types/new_types/types"
import { categoryApi } from "../category-api"

export type PatchCategoryBody = CategoryWithImages

export const useEditCategory = (id: string | null) => {
  const langBase = useLang()

  const { search, page } = useGetParams()
  const { t } = useTranslation("translation", { keyPrefix: `${langBase}.edit` })

  const {
    mutate,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ["category", id],
    mutationFn: (body: PatchCategoryBody) => {
      const { images, ...other } = body

      return categoryApi.update(other)
    },
    onSuccess: (data) => {
      toast.success(t("success"))
      queryClient.setQueryData(["categories", search, page], (oldData: GetAllCategoriesResponse) => ({
        ...oldData,
        rows: oldData.rows.map((category) => (category.id === data.id ? data : category)),
      }))
    },
    onError: () => toast.error(t("error")),
  })

  if (isPending) toast.info(t("pending"))

  return {
    onEdit: mutate,
    isLoading: isPending,
    isSuccess,
  }
}

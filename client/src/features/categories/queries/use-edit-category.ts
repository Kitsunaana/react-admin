import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { categoriesApi as categoriesApiV2 } from "features/categories/api/categories-api"
import { CategoryDto } from "shared/types/category"
import { Common } from "shared/types/common"
import { queryClient } from "app/providers/query-client"
import { isNumber } from "shared/lib/utils"
import { useCategorySearchParams } from "entities/category/model/use-category-search-params"
import { useTranslation, UseTranslationResponse } from "react-i18next"
import { useLang } from "shared/context/lang"

const edit = (
  id: number | null,
  payload: CategoryDto.PatchCategoryBody,
  t: UseTranslationResponse<"translation", string>["t"],
) => (
  new Promise<CategoryDto.CategoryPreview>((resolve, reject) => {
    if (!isNumber(id)) return

    const { images, ...other } = payload

    const editCategory = (media: Common.Media[]) => {
      toast.promise(() => (
        categoriesApiV2
          .patch(id, { ...other, media: [...other.media, ...media], images: [] })
          .then(resolve)
          .catch(reject)
      ), {
        pending: t("pending"),
        error: t("error"),
        success: t("success"),
      })
    }

    toast
      .promise(() => categoriesApiV2.filesUpload(images), {
        pending: t("imagePending"),
        error: t("imageError"),
      })
      .then(editCategory)
      .catch(() => editCategory([]))
  })
)

export const useEditCategory = (id: number | null) => {
  const langBase = useLang()

  const { search, page } = useCategorySearchParams()
  const { t } = useTranslation("translation", { keyPrefix: `${langBase}.edit` })

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["category", id],
    mutationFn: (payload: CategoryDto.PatchCategoryBody) => edit(id, payload, t),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["categories", search, page],
        (oldData: CategoryDto.GetAllCategoriesResponse) => ({
          ...oldData,
          rows: oldData.rows
            .map((category) => (category.id === data.id ? data : category)),
        }),
      )
    },
  })

  return {
    onEdit: mutate,
    isLoadingEdit: isPending,
    isSuccessEdit: isSuccess,
  }
}

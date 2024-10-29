import { useMutation } from "@tanstack/react-query"
import { queryClient } from "app/providers/query-client"
import { useCategorySearchParams } from "entities/category/model/use-category-search-params"
import { categoriesApi as categoriesApiV2 } from "features/categories/api/categories-api"
import { useTranslation, UseTranslationResponse } from "react-i18next"
import { toast } from "react-toastify"
import { useLang } from "shared/context/lang"
import { CategoryDto } from "shared/types/category"
import { Common } from "shared/types/common"

const create = (
  payload: CategoryDto.PostCategoryBody,
  t: UseTranslationResponse<"translation", string>["t"],
) => (
  new Promise<CategoryDto.CategoryPreview>((resolve, reject) => {
    const { images, ...other } = payload

    const createCategory = (media: Common.Media[]) => {
      toast.promise(() => (
        categoriesApiV2
          .post({
            ...other,
            images: [],
            media: [...other.media, ...media],
          })
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
      .then(createCategory)
      .catch(() => createCategory([]))
  })
)

export const useCreateCategory = () => {
  const langBase = useLang()

  const { search, page } = useCategorySearchParams()
  const { t } = useTranslation("translation", { keyPrefix: `${langBase}.create` })

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["categories"],
    mutationFn: (payload: CategoryDto.PostCategoryBody) => create(payload, t),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["categories", search, page],
        (oldData: CategoryDto.GetAllCategoriesResponse) => ({
          count: oldData.count + 1,
          rows: oldData.rows.concat([data]),
        }),
      )
    },
  })

  return {
    onCreate: mutate,
    isLoadingCreate: isPending,
    isSuccessCreate: isSuccess,
  }
}

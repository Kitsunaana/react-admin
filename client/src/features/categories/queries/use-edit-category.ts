import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { categoriesApi as categoriesApiV2 } from "features/categories/api/categories-api"
import { CategoryDto } from "shared/types/category"
import { Common } from "shared/types/common"
import { queryClient } from "app/providers/query-client"
import { categoryUrlStore } from "entities/category"
import { isNumber } from "shared/lib/utils"

const edit = (id: number | null, payload: CategoryDto.PatchCategoryBody) => (
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
        pending: "Категория обновляется",
        error: "При обновлении категории произошла ошибка",
        success: "Категория изменена",
      })
    }

    toast
      .promise(() => categoriesApiV2.filesUpload(images), {
        pending: "Идет загрузка изображений",
        error: "При загрузке изображений произошла ошибка",
      })
      .then(editCategory)
      .catch(() => editCategory([]))
  })
)

export const useEditCategory = (id: number | null) => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["category", id],
    mutationFn: (payload: CategoryDto.PatchCategoryBody) => edit(id, payload),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["categories", categoryUrlStore.searchParams],
        (oldData: CategoryDto.GetAllCategoriesResponse) => ({
          ...oldData,
          rows: oldData.rows.map((category) => (category.id === data.id ? data : category)),
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

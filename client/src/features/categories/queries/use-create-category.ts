import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { categoriesApi as categoriesApiV2 } from "features/categories/api/categories-api"
import { CategoryDto } from "shared/types/category"
import { queryClient } from "app/providers/query-client"
import { categoryUrlStore } from "entities/category"
import { Common } from "shared/types/common"

const create = (payload: CategoryDto.PostCategoryBody) => (
  new Promise<CategoryDto.CategoryPreview>((resolve, reject) => {
    const { images, ...other } = payload

    const createCategory = (media: Common.Media[]) => {
      toast.promise(() => (
        categoriesApiV2
          .post({ ...other, media: [...other.media, ...media], images: [] })
          .then(resolve)
          .catch(reject)
      ), {
        pending: "Создается категория",
        error: "При создании категории произошла ошибка",
        success: "Категория добавлена",
      })
    }

    toast
      .promise(() => categoriesApiV2.filesUpload(images), {
        pending: "Идет загрузка изображений",
        error: "При загрузке изображений произошла ошибка",
      })
      .then(createCategory)
      .catch(() => createCategory([]))
  })
)

export const useCreateCategory = () => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["categories"],
    mutationFn: create,
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["categories", categoryUrlStore.searchParams],
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

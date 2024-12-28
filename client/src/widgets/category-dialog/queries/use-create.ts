import { useMutation } from "@tanstack/react-query"
import { queryClient } from "app/providers/query-client"
import { useGetParams } from "entities/category/model/use-get-params"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import { useLang } from "shared/context/lang"
import {
  CategoryCreatedWithImages, CategoryView, GetAllCategoriesResponse,
} from "shared/types/new_types/types"
import { categoryApi } from "../category-api"

export const useCreateCategory = (onSuccess?: () => void) => {
  const langBase = useLang()

  const { search, page } = useGetParams()
  const { t } = useTranslation("translation", {
    keyPrefix: `${langBase}.create`,
  })

  const {
    mutate,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ["categories"],
    mutationFn: ({ images, ...other }: Omit<CategoryCreatedWithImages, "id" | "order">) => {
      const doCreate = new Promise<CategoryView>((resolve) => {
        setTimeout(() => {
          resolve(
            categoryApi.create({
              ...other,
              media: [],
            }),
          )
        }, 1000)
      })

      return toast.promise(doCreate, {
        success: t("success"),
        pending: t("pending"),
        error: t("error"),
      })
    },
    onSuccess: (data) => {
      onSuccess?.()

      queryClient.setQueryData(["categories", search, page], (oldData: GetAllCategoriesResponse) => ({
        count: oldData.count + 1,
        rows: oldData.rows.concat([data]),
      }))
    },
  })

  return {
    onCreate: mutate,
    isLoading: isPending,
    isSuccess,
  }
}

import { useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { isNumber } from "shared/lib/utils"
import { CategoryDto } from "shared/types/category"
import { useTranslation } from "react-i18next"
import { useLang } from "shared/context/lang"
import { categoriesApi } from "../api/categories-api"

export const useGetCategory = (id: number | null) => {
  const langBase = useLang()
  const { t } = useTranslation("translation", { keyPrefix: `${langBase}.get` })

  const { data, isPending, isFetching } = useQuery({
    enabled: id !== null,
    queryKey: ["category", id],
    queryFn: () => toast.promise(new Promise<CategoryDto.CategoryDto>((resolve) => {
      if (!isNumber(id)) return

      setTimeout(() => {
        categoriesApi
          .getById({ categoryId: id })
          .then(resolve)
      }, 200)
    }), {
      error: t("error"),
    }),
  })

  return {
    category: data,
    isLoadingGet: isPending || isFetching,
  }
}

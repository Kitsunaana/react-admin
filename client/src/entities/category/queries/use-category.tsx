import { useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { isNumber } from "shared/lib/utils"
import { CategoryDto } from "shared/types/category"
import { categoriesApi } from "../api/categories-api"

export const useGetCategory = (id: number | null) => {
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
      error: "При загрузке категории произошла ошибка",
    }),
  })

  return {
    category: data,
    isLoadingGet: isPending || isFetching,
  }
}

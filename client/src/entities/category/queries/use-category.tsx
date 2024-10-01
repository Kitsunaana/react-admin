import { useQuery } from "@tanstack/react-query"
import { categoriesApi } from "entities/category/api/categories-api"
import { toast } from "react-toastify"
import { CategoryDto } from "shared/types/category"

export const useGetCategory = (id: number | null) => {
  const { data, isPending, isFetching } = useQuery({
    enabled: id !== null,
    queryKey: ["category", id],
    queryFn: () => toast.promise(new Promise<CategoryDto.CategoryDto>((resolve) => {
      if (typeof id !== "number") return

      setTimeout(() => {
        categoriesApi
          .getById({ categoryId: id })
          .then(resolve)
      }, 1000)
    }), {
      error: "Error",
    }),
  })

  return {
    category: data,
    isLoadingGet: isPending || isFetching,
  }
}

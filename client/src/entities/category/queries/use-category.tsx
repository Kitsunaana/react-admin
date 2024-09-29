import { useQuery } from "@tanstack/react-query"
import { categoriesApi } from "entities/category/api/categories-api"
import { toast } from "react-toastify"
import { CategoryDto, CategorySchemas } from "shared/types/category"
import { Text } from "shared/ui/text"
import { Mark } from "shared/ui/mark"
import { validation } from "shared/lib/validation"

export const useGetCategory = (id: number | null) => {
  const { data, isPending, isFetching } = useQuery({
    enabled: id !== null,
    queryKey: ["category", id],
    queryFn: () => toast.promise(new Promise<CategoryDto.CategoryDto>((resolve) => {
      if (typeof id !== "number") return

      setTimeout(() => {
        categoriesApi
          .getById(validation(CategorySchemas.getCategoryParams, { categoryId: id }))
          .then(resolve)
      }, 1000)
    }), {
      success: {
        autoClose: 1000,
        render({ data }) {
          return (
            <Text
              langBase="catalog.notify.find"
              name="success"
              value={data.caption}
              translateOptions={{
                components: {
                  strong: <Mark />,
                },
              }}
            />
          )
        },
      },
      pending: {
        render() {
          return (
            <Text
              langBase="catalog.notify.find"
              name="pending"
              value={String(id) ?? ""}
              translateOptions={{
                components: {
                  strong: <Mark />,
                },
              }}
            />
          )
        },
      },
    }),
  })

  return {
    category: data,
    isLoadingGet: isPending || isFetching,
  }
}

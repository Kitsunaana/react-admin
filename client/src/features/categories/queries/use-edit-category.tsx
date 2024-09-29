import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { categoriesApi as categoriesApiV2 } from "features/categories/api/categories-api"
import { Text } from "shared/ui/text"
import { Mark } from "shared/ui/mark"
import { CategoryDto } from "shared/types/category"

export const useEditCategory = (id: number | null) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["category", id],
    mutationFn: (data: CategoryDto.CategoryUpdateDto) => (
      toast.promise(new Promise<CategoryDto.CategoryUpdateDto>((resolve) => {
        if (id === null) return

        setTimeout(() => {
          categoriesApiV2.patch(id, data).then(() => resolve(data))
        }, 1000)
      }), {
        pending: "Категория обновляется",
        error: "Ой, произошла какая-то ошибка",
        success: {
          render({ data }) {
            return (
              <Text
                sx={{ lineHeight: "28px" }}
                langBase="catalog.notify.edit"
                name="success"
                value={data.caption}
                translateOptions={{
                  components: {
                    strong: <Mark style={{ margin: "0px 3px" }} />,
                  },
                }}
              />
            )
          },
        },
      }, { autoClose: 150000 })
    ),
  })

  return {
    onEdit: mutate,
    isLoadingEdit: isPending,
  }
}

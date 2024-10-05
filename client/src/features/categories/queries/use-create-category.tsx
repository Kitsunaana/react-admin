import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { categoriesApi as categoriesApiV2 } from "features/categories/api/categories-api"
import { Text } from "shared/ui/text"
import { Mark } from "shared/ui/mark"
import { CategoryDto } from "shared/types/category"
import { queryClient } from "app/providers/query-client"
import { categoriesUrlStore } from "entities/category"

export const useCreateCategory = () => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["categories"],
    mutationFn: ({ images, ...otherPayload }: CategoryDto.CategoryCreate) => (
      toast.promise(new Promise<CategoryDto.CategoryPreview>((resolve, reject) => {
        setTimeout(() => {
          toast.promise(categoriesApiV2.filesUpload(images), {
            pending: "Идет загрузка изображений",
            error: {
              render() {
                return "При загрузке изображений произошла ошибка"
              },
            },
          })
            .then((images) => {
              categoriesApiV2.post({ ...otherPayload, media: images ?? [] })
                .then(resolve)
                .catch(reject)
            })
            .catch(() => {
              categoriesApiV2.post({ ...otherPayload, media: [] })
                .then(resolve)
                .catch(reject)
            })
        }, 1000)
      }), {
        pending: "Категория создается",
        error: {
          render({ data }) {
            if (data instanceof Error) return data.message
            return "Ой, произошла какая-то ошибка"
          },
        },
        success: {
          render({ data }) {
            return (
              <Text
                sx={{ lineHeight: "28px" }}
                langBase="catalog.notify.create"
                name="success"
                value={data.caption}
                caption={data.caption}
                translateOptions={{
                  components: {
                    strong: <Mark style={{ margin: "0px 3px" }} />,
                  },
                }}
              />
            )
          },
        },
      }, { autoClose: 1500 })
    ),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["categories", categoriesUrlStore.searchParams],
        (oldData: CategoryDto.GetAllCategoriesResponse) => ({
          ...oldData,
          rows: oldData.rows.concat([data]),
        } as CategoryDto.GetAllCategoriesResponse),
      )
    },
  })

  return {
    onCreate: mutate,
    isLoadingCreate: isPending,
    isSuccessCreate: isSuccess,
  }
}

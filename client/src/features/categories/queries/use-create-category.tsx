import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { categoriesApi as categoriesApiV2 } from "features/categories/api/categories-api"
import { Text } from "shared/ui/text"
import { Mark } from "shared/ui/mark"
import { CategoryDto } from "shared/types/category"
import { AxiosError } from "axios"
import { Common } from "shared/types/common"

interface CategoryCreatePayload extends CategoryDto.CategoryCreate {
  images: Common.Image[]
}

export const useCreateCategory = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["categories"],
    mutationFn: (payload: CategoryCreatePayload) => (
      toast.promise(new Promise<CategoryDto.CategoryPreview>((resolve) => {
        setTimeout(() => {
          toast.promise(categoriesApiV2.filesUpload(payload.images ?? []), {
            pending: "Идет загрузка изображений",
            error: {
              render({ data }) {
                console.log((data as AxiosError)?.response?.data)
                return "При загрузке изображений произошла ошибка"
              },
            },
          })
            .then((images) => {
              categoriesApiV2.post({ ...payload, media: images ?? [] })
                .then((data) => data && resolve(data))
            })
            .catch(() => {
              categoriesApiV2.post({ ...payload, media: [] })
                .then((data) => data && resolve(data))
            })
        }, 1000)
      }), {
        pending: "Категория создается",
        error: "Ой, произошла какая-то ошибка",
        success: {
          render({ data }) {
            return (
              <Text
                sx={{ lineHeight: "28px" }}
                langBase="catalog.notify.create"
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
      }, { autoClose: 1500 })
    ),
  })

  return {
    onCreate: mutate,
    isLoadingCreate: isPending,
  }
}

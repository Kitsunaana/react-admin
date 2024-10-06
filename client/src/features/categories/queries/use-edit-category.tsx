import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { categoriesApi as categoriesApiV2 } from "features/categories/api/categories-api"
import { Text } from "shared/ui/text"
import { Mark } from "shared/ui/mark"
import { CategoryDto } from "shared/types/category"

export const useEditCategory = (id: number | null) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["category", id],
    mutationFn: ({ images, ...other }: CategoryDto.PatchCategoryBody) => (
      toast.promise(new Promise<CategoryDto.PatchCategoryResponse>(async (resolve, reject) => {
        if (id === null) return

        const media = await categoriesApiV2.filesUpload(images)
        // const media = await categoriesApiV2.fakeFilesUpload()

        console.log({ ...other, media: [...other.media, ...media] })

        setTimeout(() => {
          categoriesApiV2
            .patch(id, { ...other, media: [...other.media, ...media] })
            .then(resolve)
            .catch(reject)
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

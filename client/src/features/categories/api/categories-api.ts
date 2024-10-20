import { $axios } from "shared/config/axios"
import { validation } from "shared/lib/validation"
import { CategoryDto, CategorySchemas } from "shared/types/category"
import { Common } from "shared/types/common"
import { ImageUploadResponse } from "../model/types"

const URL = "/categories"
const IMAGE_UPLOAD_URL = "https://api.cloudinary.com/v1_1/diyo8nacu/upload"

export const modifiedCategorySchemas = CategorySchemas.createCategoriesBody.omit({ images: true })

export const categoriesApi = {
  filesUpload: async (images: Common.Image[]): Promise<Common.Media[]> => (
    Promise.all<Common.Media>(
      images.map(async (image) => {
        const formData = new FormData()

        formData.append("upload_preset", "ml_default")
        formData.append("file", image.data as unknown as Blob)

        const { data } = await $axios.post<ImageUploadResponse>(IMAGE_UPLOAD_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        return {
          id: image.id,
          originalName: data.original_filename,
          filename: data.display_name,
          path: data.url,
          mimetype: data.type,
          size: data.bytes,
          order: null,
        }
      }),
    )
  ),

  delete: async (id: number) => $axios.delete(`/categories/${id}`).then(({ data }) => data),

  post: async (payload: CategoryDto.CategoryCreate): Promise<CategoryDto.PostCategoryResponse> => {
    try {
      validation(modifiedCategorySchemas, payload)

      const { data } = await $axios.post(URL, payload)

      return validation(CategorySchemas.createCategoriesResponse, data) as CategoryDto.PostCategoryResponse
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message)

      throw new Error("Error")
    }
  },

  patch: async (
    id: number | null,
    payload: CategoryDto.CategoryCreate,
  ): Promise<CategoryDto.PatchCategoryResponse> => {
    validation(modifiedCategorySchemas, payload)

    const { data } = await $axios.patch(`${URL}/${id}`, payload)

    return validation(CategorySchemas.updateCategoryResponse, data)
  },

  updatePosition: async (payload: { id: number, order: number }): Promise<number[]> => {
    const { data } = await $axios
      .patch<number[]>(`${URL}/order`, payload)

    return data
  },

  fakeFilesUpload: async (): Promise<Common.Media[]> => new Promise((resolve) => {
    resolve([
      {
        id: "5Cf5gY5pveqPMMm6D6GDI",
        originalName: "Screenshot_4",
        filename: "Screenshot_4_vlacvd",
        path: "http://res.cloudinary.com/diyo8nacu/image/upload/v1728207197/Screenshot_4_vlacvd.png",
        mimetype: "upload",
        size: 1664381,
        order: null,
      },
    ])
  }),
}

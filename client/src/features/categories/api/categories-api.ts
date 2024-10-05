import { $axios } from "shared/config/axios"
import { validation } from "shared/lib/validation"
import { createMultipart } from "shared/lib/multipart"
import { CategoryDto, CategorySchemas } from "shared/types/category"
import { Common } from "shared/types/common"

const URL = "/categories"

interface ImageUploadResponse {
  asset_folder: string,
  asset_id: string,
  bytes: number,
  created_at: string,
  display_name: string
  etag: string
  existing: boolean,
  format: string,
  height: number,
  original_filename: string,
  placeholder: boolean,
  public_id: string,
  resource_type: string
  secure_url: string
  signature: string
  tags: string[]
  type: string
  url: string
  version: number
  version_id: string
  width: number
}

export const modifiedCategorySchemas = CategorySchemas.createCategoriesBody.omit({ images: true })

export const categoriesApi = {
  filesUpload: async (images: Common.Image[]): Promise<Common.Media[]> => {
    const url = "https://api.cloudinary.com/v1_1/diyo8nacu/upload"

    return Promise.all<Common.Media>(
      images.map(async (image) => {
        const fd = new FormData()

        fd.append("upload_preset", "ml_default")
        fd.append("file", image.data as unknown as Blob)

        const { data } = await $axios.post<ImageUploadResponse>(url, fd, {
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
        } as Common.Media
      }),
    )
  },

  post: async (payload: CategoryDto.CategoryCreateWithMedia): Promise<CategoryDto.PostCategoryResponse> => {
    try {
      validation(modifiedCategorySchemas, payload)
      const { data } = await $axios.post(URL, payload)

      return validation(
        CategorySchemas.createCategoriesResponse,
        data,
      ) as CategoryDto.PostCategoryResponse
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message)

      throw new Error("Error")
    }
  },

  patch: async (
    id: number | null,
    data: CategoryDto.CategoryUpdateDto,
  ): Promise<CategoryDto.PatchCategoryResponse> => {
    try {
      const imagesIds = data.images?.map(({ id, caption }) => ({ id, caption }))

      const formData = createMultipart({ ...data, imagesIds }, ["images"])
      const response = await $axios.patch<CategoryDto.PatchCategoryResponse>(
        `${URL}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )

      return validation(CategorySchemas.updateCategoryResponse, response.data)
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message)

      throw new Error("Error")
    }
  },
}

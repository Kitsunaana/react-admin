import { $axios } from "shared/config/axios"
import { validation } from "shared/lib/validation"
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
    payload: CategoryDto.CategoryCreateWithMedia,
  ): Promise<CategoryDto.PatchCategoryResponse> => {
    validation(modifiedCategorySchemas, payload)
    const { data } = await $axios.patch(`${URL}/${id}`, payload)

    return validation(CategorySchemas.updateCategoryResponse, data)
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

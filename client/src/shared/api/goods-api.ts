import { $axios } from "shared/config/axios"
import { validation } from "shared/lib/validation"
import { z } from "zod"
import { createMultipart } from "shared/lib/multipart"
import { createGoodSchema } from "features/goods/dialog/ui/good-edit-dialog"
import { GoodSchemas, GoodDto } from "shared/types/good"

const URL = "/goods"

export const goodsApi = {
  post: async (data: GoodDto.CreateGoodBody) => {
    try {
      validation(GoodSchemas.createGoodBody, data)

      const imagesIds = data.images.map(({ id, caption }) => ({ id, caption }))

      const formData = createMultipart({ ...data, imagesIds }, ["images"])
      const response = await $axios.post(URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      return response.data
    } catch (error) {
      if (error instanceof Error) console.log(error.message)
    }
  },

  patch: async (id: number | null, data: z.infer<typeof createGoodSchema>) => {
    try {
      if (id === null) throw new Error("id does not match type number")

      validation(createGoodSchema, data)

      const imagesIds = data.images?.map(({ id, caption }) => ({ id, caption }))

      const formData = createMultipart({ ...data, imagesIds }, ["images"])
      const response = await $axios.patch(`${URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      return response.data
    } catch (error) {
      if (error instanceof Error) console.log(error.message)
    }
  },

  getById: async (id: number | null): Promise<GoodDto.GetByIdGoodResponse> => {
    if (id === null) throw new Error("id does not match type number")

    const good = await $axios.get(`${URL}/${id}`)

    return validation(GoodSchemas.getGoodByIdResponse, good.data)
  },

  getAll: async (): Promise<GoodDto.GetAllGoodsResponse> => {
    const goods = await $axios.get(URL)

    return validation(GoodSchemas.getGoodsResponse, goods.data)
  },
}

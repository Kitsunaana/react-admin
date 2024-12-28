import { $axios } from "shared/config/axios"
import { validation } from "shared/lib/validation"
import { tagsSchema } from "./domain/schemas"

const getAll = async (): Promise<string[]> => {
  const { data } = await $axios.get("/tags")

  return validation(tagsSchema, data)
}

export const tagApi = {
  getAll,
}

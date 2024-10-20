import { $axios } from "shared/config/axios"
import { validation } from "shared/lib/validation"
import { tagsSchema } from "../model/schemas"

const URL = "/tags"

export const tagApi = {
  getAll: (): Promise<string[]> => $axios.get(URL)
    .then(({ data }) => validation(tagsSchema, data)),
}

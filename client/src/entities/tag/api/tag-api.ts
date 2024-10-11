import { $axios } from "shared/config/axios"

const URL = "/tags"

export const tagApi = {
  getAll: (): Promise<string[]> => $axios.get(URL).then(({ data }) => data),
}

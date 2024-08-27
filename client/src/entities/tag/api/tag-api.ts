import { $axios } from "shared/config/axios"

const URL = "/tags"

export const tagApi = {
  getAll: () => $axios.get(URL).then(({ data }) => data),
}

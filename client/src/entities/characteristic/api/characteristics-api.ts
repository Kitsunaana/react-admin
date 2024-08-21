import { $axios } from "shared/config/axios"

const URL = "/characteristics"

export const characteristicsApi = {
  getAll: () => $axios.get(URL).then(({ data }) => data),

  getAllUnits: () => $axios.get(`${URL}/units`).then(({ data }) => data),
}

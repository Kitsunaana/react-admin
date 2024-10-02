import { $axios } from "shared/config/axios"
import { validation } from "shared/lib/validation"
import { Common, Schemas } from "shared/types/common"

const URL = "/characteristics"

export const characteristicsApi = {
  getAll: async (): Promise<Common.CharacteristicsResponse> => {
    const { data } = await $axios.get(URL)

    return (
      data
    )
  },

  getAllUnits: async (): Promise<Common.UnitsResponse> => {
    const { data } = await $axios.get(`${URL}/units`)

    return (
      data
    )
  },
}

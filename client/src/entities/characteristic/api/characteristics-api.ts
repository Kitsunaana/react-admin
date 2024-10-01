import { $axios } from "shared/config/axios"
import { validation } from "shared/lib/validation"
import { Common, Schemas } from "shared/types/common"

const URL = "/characteristics"

export const characteristicsApi = {
  getAll: async (): Promise<Common.CharacteristicsResponse> => {
    const { data } = await $axios.get(URL)

    return (
      validation(Schemas.getCharacteristicsResponse, data) as Common.CharacteristicsResponse
    )
  },

  getAllUnits: async (): Promise<Common.UnitsResponse> => {
    const { data } = await $axios.get(`${URL}/units`)

    return (
      validation(Schemas.getUnitsResponse, data) as Common.UnitsResponse
    )
  },
}

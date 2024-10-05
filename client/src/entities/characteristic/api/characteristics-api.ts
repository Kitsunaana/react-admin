import { $axios } from "shared/config/axios"
import { validation } from "shared/lib/validation"
import { getCharacteristicsResponse } from "entities/characteristic/model/schemas"
import { CharacteristicsResponse, UnitsResponse } from "entities/characteristic/model/types"
import { Schemas } from "shared/types/common"

const URL = "characteristics"

export const characteristicsApi = {
  getAll: async (): Promise<CharacteristicsResponse> => {
    const { data } = await $axios.get(URL)

    return validation(getCharacteristicsResponse, data)
  },

  getAllUnits: async (): Promise<UnitsResponse> => {
    const { data } = await $axios.get(`${URL}/units`)

    return validation(Schemas.getUnitsResponse, data)
  },
}

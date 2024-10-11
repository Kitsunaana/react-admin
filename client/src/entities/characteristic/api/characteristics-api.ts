import { $axios } from "shared/config/axios"
import { validation } from "shared/lib/validation"
import { Schemas } from "shared/types/common"
import { getCharacteristicsResponse } from "../model/schemas"
import { CharacteristicsResponse, UnitsResponse } from "../model/types"

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

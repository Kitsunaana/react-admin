import { $axios } from "shared/config/axios"
import { validation } from "shared/lib/validation"
import { getCharacteristicsResponse, getUnitsResponse } from "./domain/schemas"
import { CharacteristicsResponse, UnitsResponse } from "./domain/types"

const getAll = async (): Promise<CharacteristicsResponse> => {
  const { data } = await $axios.get("/characteristics")

  return validation(getCharacteristicsResponse, data)
}

const getAllUnits = async (): Promise<UnitsResponse> => {
  const { data } = await $axios.get("/characteristics/units")

  return validation(getUnitsResponse, data)
}

export const characteristicsApi = {
  getAll,
  getAllUnits,
}

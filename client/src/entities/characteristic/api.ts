import { $axios } from "shared/config/axios"
import { validation } from "shared/lib/validation"
import { getCharacteristicsResponse, getUnitsResponse } from "./domain/schemas"
import { CharacteristicsResponse, UnitsResponse } from "./domain/types"

const getAllCharacteristics = (): Promise<CharacteristicsResponse> => (
  $axios.get("/characteristics")
    .then((response) => validation(getCharacteristicsResponse, response.data))
)

const getAllUnits = (): Promise<UnitsResponse> => (
  $axios.get("/characteristics/units")
    .then((response) => validation(getUnitsResponse, response.data))
)

export const characteristicsApi = {
  getAllCharacteristics,
  getAllUnits,
}

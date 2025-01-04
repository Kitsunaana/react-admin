import { $axios } from "shared/config/axios"
import { validation } from "shared/lib/validation"
import { getAllLocalesResponseSchema } from "./domain/schemas"
import { Locale } from "./domain/types"

const getAllLocales = async (): Promise<Locale[]> => (
  $axios.get("/locales").then(({ data }) => validation(getAllLocalesResponseSchema, data))
)

export const altNameApi = {
  getAllLocales,
}

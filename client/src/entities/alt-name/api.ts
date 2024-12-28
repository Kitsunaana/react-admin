import { $axios } from "shared/config/axios"
import { Locale } from "shared/types/new_types/types"

const getAll = async (): Promise<Locale[]> => (
  $axios.get("/locales").then(({ data }) => data)
)

export const altNameApi = {
  getAll,
}

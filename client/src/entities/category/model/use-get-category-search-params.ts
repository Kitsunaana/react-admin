import { useSearchParams } from "react-router-dom"
import { validation } from "shared/lib/validation"
import { categorySearchParamsSchema } from "../domain/schemas"

export const useGetCategorySearchParams = () => {
  const [searchParams] = useSearchParams()

  const page = searchParams.get("page")
  const search = searchParams.get("search")

  const params = { page, search }

  try {
    return validation(categorySearchParamsSchema, params)
  } catch (error) {
    return { page: null, search: "" }
  }
}

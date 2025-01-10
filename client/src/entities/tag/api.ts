import { $axios } from "shared/config/axios"
import { validation } from "shared/lib/validation"
import { getAllTagsResponse } from "./domain/schemas"

const getAllTags = () => (
  $axios.get("/tags")
    .then((response) => validation(getAllTagsResponse, response.data))
)

export const tagApi = {
  getAllTags,
}

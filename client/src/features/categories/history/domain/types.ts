import { CategoryDto } from "shared/types/category"
import { CategoryEvents } from "./events"

export type Category =
  (
    CategoryDto.CategoryCreate
    | CategoryDto.CategoryDto & { images: CategoryDto.CategoryCreate["images"] }
    )

export interface CategoryWithEvents {
  newData: Category
  lastData: Category
  event: CategoryEvents
}

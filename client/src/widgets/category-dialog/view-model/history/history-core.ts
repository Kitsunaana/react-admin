import { CategoryEvent } from "./events"
import { CategoryLocal } from "../../domain/category/types"

export type CategoryWithEvents = {
  newData: CategoryLocal
  lastData: CategoryLocal
  event: CategoryEvent
}

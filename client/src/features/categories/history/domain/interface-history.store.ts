import { CategoryDto } from "shared/types/category"
import { Category, CategoryWithEvents } from "./types"
import { CategoryEvents } from "./events"

export interface HistoryStoreImpl {
  _category: Category | undefined
  _events: CategoryEvents[]
  _cursor: number

  get events(): CategoryEvents[]
  get currentVersion(): CategoryEvents
  get canUndo(): boolean
  get canRedo(): boolean
  get allEvents(): CategoryEvents[]

  get category(): Category
  get categoryWithEvents(): CategoryWithEvents[]

  undo: () => void
  redo: () => void
  reset: () => void
  moveToVersion: (index: number) => void

  recordEvent: (event: CategoryEvents) => void

  setCategory: (category: CategoryDto.CategoryCreate | CategoryDto.CategoryDto) => void
}

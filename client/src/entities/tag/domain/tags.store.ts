import { Action } from "entities/tag/domain/types"
import { CategoryDto } from "shared/types/category"

export interface TagsStoreImpl {
  tags: Array<CategoryDto.TagCreate | CategoryDto.Tag>
  create: (payload: CategoryDto.TagBase & { id: string }) => void
  edit: (payload: CategoryDto.TagCreate) => void
  remove: (id: number | string) => void
  getData: () => { tags: Array<CategoryDto.TagCreate | CategoryDto.Tag> }
  setTags: (tags: Array<CategoryDto.Tag | CategoryDto.TagCreate>) => void
  setCopiedTags: (action: Action, tags: CategoryDto.TagBase[]) => void
  isCreatedOrUpdated: (id: number | string) => boolean
  get filteredTags(): Array<CategoryDto.TagCreate>
}

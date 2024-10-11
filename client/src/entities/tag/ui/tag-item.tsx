import { LangContext, useLang } from "shared/context/lang"
import { CategoryDto } from "shared/types/category"
import { Box } from "shared/ui/box"
import { IconButtonDelete } from "shared/ui/buttons/icon-button-delete"
import { IconButtonEdit } from "shared/ui/buttons/icon-button-edit"
import { Vertical } from "shared/ui/divider"
import { RowItem } from "shared/ui/row-item"
import { Tag } from "./tag"

interface TagItemProps extends CategoryDto.TagCreate {
  onRemove: (id: number | string, caption: string) => Promise<void>
  onEdit: (data: CategoryDto.TagCreate) => void
  isCreatedOrUpdated: boolean
}

export const TagItem = (props: TagItemProps) => {
  const {
    id,
    icon,
    color,
    caption,
    onRemove,
    onEdit,
    isCreatedOrUpdated,
  } = props

  const langBase = useLang()

  return (
    <LangContext lang={`${langBase}.rows`}>
      <RowItem color={isCreatedOrUpdated && "success"}>
        <Tag
          caption={caption}
          color={color}
          icon={icon}
        />
        <Box flex row ai>
          <Vertical />
          <IconButtonEdit
            onClick={() => onEdit({
              icon, color, caption, id,
            })}
          />
          <IconButtonDelete onClick={() => onRemove(id, caption)} />
        </Box>
      </RowItem>
    </LangContext>
  )
}

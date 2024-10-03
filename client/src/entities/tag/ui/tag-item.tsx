import { Box } from "shared/ui/box"
import { Vertical } from "shared/ui/divider"
import { IconButtonEdit } from "shared/ui/buttons/icon-button-edit"
import { IconButtonDelete } from "shared/ui/buttons/icon-button-delete"
import { RowItem } from "shared/ui/row-item"
import { LangContext, useLang } from "shared/context/lang"
import { CategoryDto } from "shared/types/category"
import { Tag } from "./tag"

interface TagItemProps extends CategoryDto.TagCreate {
  onRemove: (id: number | string, caption: string) => Promise<void>
  onEdit: (id: number | string, data: CategoryDto.TagCreate) => void
  isRecordCreatedOrUpdated: (id: number | string) => boolean
}

export const TagItem = (props: TagItemProps) => {
  const {
    id,
    icon,
    color,
    caption,
    onRemove,
    onEdit,
    isRecordCreatedOrUpdated,
  } = props

  const langBase = useLang()

  return (
    <LangContext lang={`${langBase}.rows`}>
      <RowItem color={isRecordCreatedOrUpdated(id) && "success"}>
        <Tag
          caption={caption}
          color={color}
          icon={icon}
        />
        <Box flex row ai>
          <Vertical />
          <IconButtonEdit
            onClick={() => onEdit(id, {
              icon, color, caption, id,
            })}
          />
          <IconButtonDelete onClick={() => onRemove(id, caption)} />
        </Box>
      </RowItem>
    </LangContext>
  )
}

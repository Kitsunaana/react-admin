import { Box } from "shared/ui/box"
import { Vertical } from "shared/ui/divider"
import { IconButtonEdit } from "shared/ui/buttons/icon-button-edit"
import { IconButtonDelete } from "shared/ui/buttons/icon-button-delete"
import { RowItem } from "shared/ui/row-item"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { useDeleteDialogStore } from "shared/ui/dialog/context/dialog-delete-context"
import { LangContext, useLang } from "shared/context/lang"
import { ITag } from "../model/types"
import { Tag } from "./tag"

interface TagItemProps extends ITag {}

export const TagItem = (props: TagItemProps) => {
  const {
    tagColor, tag, edited, local, id, icon,
  } = props

  const editStore = useEditDialogStore()
  const deleteStore = useDeleteDialogStore()
  const langBase = useLang()

  const onOpenEditDialog = () => {
    editStore.openDialog(id, {
      tag, id, icon, tagColor,
    })
  }

  const onOpenDeleteDialog = () => {
    deleteStore.openDialog(id, {
      caption: tag.caption,
    })
  }

  return (
    <LangContext lang={`${langBase}.rows`}>
      <RowItem color={(edited || local) ? "success" : undefined}>
        <Tag caption={tag.caption} icon={icon} color={tagColor} />

        <Box flex row ai>
          <Vertical />
          <IconButtonEdit onClick={onOpenEditDialog} />
          <IconButtonDelete onClick={onOpenDeleteDialog} />
        </Box>
      </RowItem>
    </LangContext>
  )
}

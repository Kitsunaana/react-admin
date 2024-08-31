import { DialogDelete } from "shared/ui/dialog/dialog-delete"
import React from "react"
import { TagsStore } from "entities/tag"

export const TagDeleteDialog = ({ tags }: { tags: TagsStore }) => (
  <DialogDelete onDeleteLocal={tags.remove} />
)

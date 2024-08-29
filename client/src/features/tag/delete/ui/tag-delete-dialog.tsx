import { DialogDelete } from "shared/ui/dialog/dialog-delete"
import React from "react"
import { useStores } from "features/categories/edit/model/context"

export const TagDeleteDialog = () => {
  const { tags } = useStores()

  return (
    <DialogDelete
      langBase="tags"
      onDeleteLocal={tags.remove}
    />
  )
}

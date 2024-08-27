import { useStores } from "features/categories/create-and-edit/ui/dialog"
import { DialogDelete } from "shared/ui/dialog/dialog-delete"
import React from "react"

export const TagDeleteDialog = () => {
  const { tags } = useStores()

  return (
    <DialogDelete
      langBase="tags"
      onDeleteLocal={tags.remove}
    />
  )
}

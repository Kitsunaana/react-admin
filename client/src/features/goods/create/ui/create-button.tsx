import { dispatch } from "shared/lib/event"
import { IconButton } from "shared/ui/icon-button"
import React from "react"

export const CreateButton = () => (
  <IconButton
    name="add"
    color="success"
    fontSize={20}
    onClick={() => {
      dispatch("dialog.goods.create" as any)
    }}
  />
)

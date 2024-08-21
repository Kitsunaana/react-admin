import React from "react"
import { ContextMenuItem } from "shared/ui/menu/context-menu-item"

export interface DeleteButtonProps {
  onClick: () => void
  close: () => void
}

export const DeleteButton = (props: DeleteButtonProps) => {
  const { onClick, close } = props

  return (
    <ContextMenuItem
      onClick={() => {
        onClick()
        close()
      }}
      caption="Удалить"
      icon="delete"
      variantIcon="warning"
    />
  )
}

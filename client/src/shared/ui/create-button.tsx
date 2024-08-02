import { dispatch } from "shared/lib/event"
import { IconButton } from "shared/ui/icon-button"
import React from "react"

interface CreateButtonProps {
  langBase: string
}

export const CreateButton = (props: CreateButtonProps) => {
  const { langBase } = props

  return (
    <IconButton
      name="add"
      color="success"
      fontSize={20}
      onClick={() => {
        dispatch(`${langBase}.dialog.edit` as any)
      }}
    />
  )
}

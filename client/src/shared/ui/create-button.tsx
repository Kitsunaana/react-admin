import { dispatch } from "shared/lib/event"
import { IconButton } from "shared/ui/icon-button"
import React from "react"

interface CreateButtonProps {
  actionName: string
}

export const CreateButton = (props: CreateButtonProps) => {
  const { actionName } = props

  return (
    <IconButton
      name="add"
      color="success"
      fontSize={20}
      onClick={() => {
        dispatch(actionName as any)
      }}
    />
  )
}

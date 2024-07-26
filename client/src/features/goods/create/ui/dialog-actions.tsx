import { Dispatch, memo, SetStateAction } from "react"
import Button from "@mui/material/Button"
import * as React from "react"

interface DialogActionsProps {
  isValid: boolean
  onClose: Dispatch<SetStateAction<boolean>>
}

export const DialogActions = memo((props: DialogActionsProps) => {
  const { isValid, onClose } = props

  return (
    <>
      <Button disabled={!isValid} onClick={() => onClose(false)}>
        Сохранить
      </Button>
      <Button onClick={() => onClose(false)} autoFocus>
        Отмена
      </Button>
    </>
  )
})

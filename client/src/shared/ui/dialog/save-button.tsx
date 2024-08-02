import { useFormContext } from "react-hook-form"
import Button from "@mui/material/Button"
import { Text } from "shared/ui/text"
import * as React from "react"

interface SaveButtonProps {
  onClick: () => void
  langBase?: string
}

export const SaveButton = (props: SaveButtonProps) => {
  const { onClick, langBase } = props

  const { formState } = useFormContext()

  return (
    <Button
      sx={{ borderRadius: 2 }}
      disabled={!formState.isValid}
      onClick={onClick}
      color="primary"
      variant="outlined"
    >
      <Text langBase={langBase || "global.dialog"} name="save" />
    </Button>
  )
}

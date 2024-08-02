import Button from "@mui/material/Button"
import { Text } from "shared/ui/text"
import * as React from "react"

interface CancelButtonProps {
  onClick: () => void
  langBase?: string
}

export const CancelButton = (props: CancelButtonProps) => {
  const { onClick, langBase } = props

  return (
    <Button
      sx={{ borderRadius: 2 }}
      onClick={onClick}
      variant="contained"
      color="warning"
    >
      <Text langBase={langBase || "global.dialog"} name="cancel" />
    </Button>
  )
}

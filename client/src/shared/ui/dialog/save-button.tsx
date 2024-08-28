import { useFormContext } from "react-hook-form"
import Button from "@mui/material/Button"
import { Text } from "shared/ui/text"
import * as React from "react"
import { memo } from "react"
import { shallowEqual } from "shared/lib/utils"

interface SaveButtonProps {
  onClick: () => void
  langBase?: string
}

export const SaveButton = memo((props: SaveButtonProps) => {
  const { onClick, langBase } = props

  return (
    <Button
      sx={{ borderRadius: 2 }}
      onClick={onClick}
      color="primary"
      // variant="outlined"
      variant="contained"
    >
      <Text sx={{ fontSize: 14 }} langBase={langBase || "global.dialog"} name="save" />
    </Button>
  )
}, shallowEqual)

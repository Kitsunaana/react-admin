import Button from "@mui/material/Button"
import { Text } from "shared/ui/text"
import * as React from "react"
import { memo } from "react"
import { shallowEqual } from "shared/lib/utils"
import { ButtonProps } from "@mui/material"

interface SaveButtonProps extends ButtonProps {
  onClick: () => void
  langBase?: string
}

export const SaveButton = memo((props: SaveButtonProps) => {
  const { onClick, langBase, ...other } = props

  return (
    <Button
      sx={{ borderRadius: 2 }}
      onClick={onClick}
      color="primary"
      variant="contained"
      {...other}
    >
      <Text sx={{ fontSize: 14 }} langBase={langBase || "global.dialog"} name="save" />
    </Button>
  )
})

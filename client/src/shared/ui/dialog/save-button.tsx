import { ButtonProps } from "@mui/material"
import Button from "@mui/material/Button"
import { memo } from "react"
import { Text } from "shared/ui/text"

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

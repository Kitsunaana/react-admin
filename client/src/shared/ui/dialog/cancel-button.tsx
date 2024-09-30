import Button from "@mui/material/Button"
import { Text } from "shared/ui/text"
import { ButtonProps } from "@mui/material"

interface CancelButtonProps extends ButtonProps{
  onClick: () => void
  langBase?: string
}

export const CancelButton = (props: CancelButtonProps) => {
  const { onClick, langBase, ...other } = props

  return (
    <Button
      sx={{ borderRadius: 2 }}
      onClick={onClick}
      variant="contained"
      color="warning"
      {...other}
    >
      <Text
        sx={{ fontSize: 14 }}
        langBase={langBase || "global.dialog"}
        name="cancel"
      />
    </Button>
  )
}

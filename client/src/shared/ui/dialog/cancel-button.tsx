import { ButtonProps, Tooltip } from "@mui/material"
import { Text } from "shared/ui/text"
import Button from "@mui/material/Button"

interface CancelButtonProps extends ButtonProps{
  onClick: () => void
  langBase?: string
}

export const CancelButton = (props: CancelButtonProps) => {
  const { onClick, langBase, ...other } = props

  return (
    <Tooltip
      arrow
      placement="bottom"
      title={(
        <Text
          fontSize={11}
          sx={{ textTransform: "capitalize" }}
          caption="Escape"
        />
    )}
    >
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
    </Tooltip>
  )
}

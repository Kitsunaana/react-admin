import { ButtonProps, Tooltip } from "@mui/material"
import Button from "@mui/material/Button"
import { ButtonHTMLAttributes, memo } from "react"
import { Text } from "shared/ui/text"

type SaveButtonProps = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: () => void
  langBase?: string
}

export const SaveButton = memo((props: SaveButtonProps) => {
  const { onClick, langBase, ...other } = props

  return (
    <Tooltip
      arrow
      placement="bottom"
      title={(
        <Text
          fontSize={11}
          sx={{ textTransform: "capitalize" }}
          caption="Ctrl+Enter"
        />
      )}
    >
      <Button
        sx={{ borderRadius: 2, display: "flex", gap: 1 }}
        onClick={onClick}
        color="primary"
        variant="outlined"
        type="submit"
        {...other}
      >
        <Text fontSize={14} langBase={langBase || "global.dialog"} name="save" />
      </Button>
    </Tooltip>
  )
})

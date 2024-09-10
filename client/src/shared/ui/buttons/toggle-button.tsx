import * as React from "react"
import { styled } from "@mui/material/styles"
import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"
import ToggleButtonBase, { ToggleButtonProps as ToggleButtonPropsBase } from "@mui/material/ToggleButton"
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup"
import { Icon } from "shared/ui/icon"
import { alpha, ExtendButtonBase } from "@mui/material"

interface ToggleButtonProps extends ToggleButtonPropsBase {
  help: string
  icon: string
}

export const ToggleButton = (props: ToggleButtonProps) => {
  const {
    sx, help, icon, ...other
  } = props

  return (
    <ToggleButtonBase
      sx={{
        p: 0.5,
        backgroundColor: ({ palette }) => (palette.mode === "dark"
          ? alpha(palette.common.black, 0.55)
          : palette.common.white),
        backgroundImage: ({ background }) => background.sectionBackground,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      <Icon
        help={{ arrow: true, title: help }}
        fontSize="small"
        name={icon}
      />
    </ToggleButtonBase>
  )
}

interface ToggleButtonGroupProps {
  name: string
  onChangeSettings: (name: string, value: string) => void
  defaultValue: string
}

export function ButtonGroup(props: ToggleButtonGroupProps) {
  const { name, onChangeSettings, defaultValue } = props

  const [alignment, setAlignment] = React.useState(defaultValue)

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment !== null) {
      onChangeSettings(name, newAlignment)
      setAlignment(newAlignment)
    }
  }

  return (
    <Paper
      elevation={0}
      sx={(theme) => ({
        display: "flex",
        border: `1px solid ${theme.palette.divider}`,
        flexWrap: "wrap",
        borderRadius: 2,

        "&:not(:last-child)": {
          mb: 0.5,
        },
      })}
    >
      <ToggleButtonGroup
        size="small"
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        sx={{ width: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        <ToggleButton
          icon="category"
          help="Вставлять с заменой"
          value="replace"
        />
        <ToggleButton
          icon="category"
          help="Не изменять"
          value="none"
        />
        <ToggleButton
          icon="category"
          help="Вставлять с добавлением"
          value="add"
        />
      </ToggleButtonGroup>
    </Paper>
  )
}

import { alpha } from "@mui/material"
import Paper from "@mui/material/Paper"
import ToggleButtonBase, { ToggleButtonProps as ToggleButtonPropsBase } from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { Action, KeysSettingsRows } from "features/categories/model/stores/dialog-store"
import * as React from "react"
import { Icon } from "shared/ui/icon"

interface ToggleButtonProps extends ToggleButtonPropsBase {
  help: string
  icon: string
}

export const ToggleButton = (props: ToggleButtonProps) => {
  const {
    sx,
    help,
    icon,
    ...other
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
        help={{ title: help }}
        fontSize="small"
        name={icon}
      />
    </ToggleButtonBase>
  )
}

interface ToggleButtonGroupProps {
  name: KeysSettingsRows
  onChangeSetting: (name: KeysSettingsRows, value: Action) => void
  defaultValue: string
}

export function ButtonGroup(props: ToggleButtonGroupProps) {
  const { name, onChangeSetting, defaultValue } = props

  const [alignment, setAlignment] = React.useState(defaultValue)

  const handleAlignment = (_: React.MouseEvent<HTMLElement, MouseEvent>, newAlignment: Action) => {
    if (newAlignment !== null) {
      onChangeSetting(name, newAlignment)
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

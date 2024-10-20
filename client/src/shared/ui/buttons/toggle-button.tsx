import { alpha } from "@mui/material"
import Paper from "@mui/material/Paper"
import { styled } from "@mui/material/styles"
import ToggleButtonBase, { ToggleButtonProps as ToggleButtonPropsBase } from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import * as React from "react"
import { Icon } from "shared/ui/icon"
import { Text } from "../text"

const StyledToggleButton = styled(ToggleButtonBase)(({ theme }) => ({
  padding: 4,
  backgroundImage: theme.background.sectionBackground,
  borderRadius: 8,

  backgroundColor: theme.palette.mode === "dark"
    ? alpha(theme.palette.common.black, 0.55)
    : theme.palette.common.white,
}))

const ButtonWrapper = styled(Paper)(({ theme }) => ({
  display: "flex",
  border: `1px solid ${theme.palette.divider}`,
  flexWrap: "wrap",
  borderRadius: 10,

  "&:not(:last-child)": {
    mb: 0.5,
  },
}))

const ButtonInner = styled(ToggleButtonGroup)(() => ({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
}))

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
    <StyledToggleButton {...other}>
      <Icon
        help={{ title: <Text name={help} /> }}
        fontSize="small"
        name={icon}
      />
    </StyledToggleButton>
  )
}

interface ToggleButtonGroupProps<T> {
  name: string
  options: string[]
  defaultValue: T
  onChange: (name: string, value: T) => void
}

export const ButtonGroup = <T, >(props: ToggleButtonGroupProps<T>) => {
  const {
    name,
    options,
    defaultValue,
    onChange,
  } = props

  const [alignment, setAlignment] = React.useState(defaultValue)

  const handleChange = (_: React.MouseEvent<HTMLElement, MouseEvent>, newAlignment: T) => {
    if (newAlignment !== null) {
      onChange(name, newAlignment)
      setAlignment(newAlignment)
    }
  }

  return (
    <ButtonWrapper elevation={0}>
      <ButtonInner
        size="small"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="text alignment"
      >
        {options.map((option) => (
          <ToggleButton
            key={option}
            icon={option}
            help={option}
            value={option}
          />
        ))}
      </ButtonInner>
    </ButtonWrapper>
  )
}

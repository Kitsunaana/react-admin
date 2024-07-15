import { Box } from "shared/ui/Box"
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ButtonBase,
  useTheme,
  alpha,
  Slider,
  Checkbox,
  FormControlLabel,
} from "@mui/material"
import { ChangeEvent, useState } from "react"
import { dispatch } from "shared/lib/event"
import { Text } from "shared/ui/Text"
import { Icon } from "shared/ui/Icon"
import { Divider } from "shared/ui/Divider"

const SettingsPage = () => {
  const [language, setLanguage] = useState(localStorage.getItem("lngAdmin") ?? "en")
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light")

  const { palette: { mode } } = useTheme()

  const handleChange = (event: SelectChangeEvent) => {
    const { value } = event.target

    localStorage.setItem("lngAdmin", value)
    setLanguage(value)

    dispatch("changeLanguage", { language: value as "en" | "ru" })
  }
  const handleOnChangeTheme = (value: string) => {
    setTheme(value)

    localStorage.setItem("theme", value)

    dispatch("theme", value)
  }

  const handleOnChangeIconThickness = (event: Event, value: number | Array<unknown>) => {
    if (typeof value === "number") {
      dispatch("changeIconsSettings", { weight: value })
    }
  }

  const handleOnChangeIconFill = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target === null) return

    dispatch("changeIconsSettings", { fill: event.target.checked ? 1 : 0 })
  }

  const themes = [
    {
      value: "light",
      icon: "light",
      caption: "themes.light",
    },
    {
      value: "system",
      icon: "system",
      caption: "themes.system",
    },
    {
      value: "dark",
      icon: "dark",
      caption: "themes.dark",
    },
  ]

  return (
    <Box flex gap={2}>
      <FormControl fullWidth size="small" sx={{ height: "35px !important" }}>
        <InputLabel id="demo-simple-select-label"><Text name="change-language" onlyText /></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          label={<Text name="change-language" onlyText />}
          onChange={handleChange}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="ru">Русский</MenuItem>
        </Select>
      </FormControl>

      <Box>
        <Text name="change-theme" sx={{ mb: 1 }} />

        <Box
          row
          sx={{
            border: ({ palette }) => `1px solid ${alpha(palette.grey["400"], mode === "light" ? 1 : 0.5)}`,
            p: 0.5,
            display: "inline-flex",
            borderRadius: 1,
            gap: 0.5,
          }}
        >
          {themes.map((item) => (
            <ButtonBase
              onClick={() => handleOnChangeTheme(item.value)}
              key={item.value}
              sx={{
                fontSize: 16,
                userSelect: "none",
                textTransform: "uppercase",
                borderRadius: 1,
                px: 1,
                pt: 1,
                pb: 0.25,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                "&:hover": {
                  transition: ".2s",
                  backgroundColor: ({ palette }) => (mode === "light" ? palette.grey["100"] : alpha(palette.common.white, 0.06)),
                },
                backgroundColor: ({ palette }) => (theme === item.value
                  ? (mode === "light" ? palette.grey["300"] : alpha(palette.common.white, 0.16))
                  : null),
              }}
            >
              <Icon name={item.icon} />
              <Text name={item.caption} onlyText />
            </ButtonBase>
          ))}
        </Box>
      </Box>

      <Divider><Text name="icons" /></Divider>

      <Box sx={{ px: 2.5 }}>
        <Text name="icon-thickness" />
        <Slider
          onChange={handleOnChangeIconThickness}
          aria-label="Temperature"
          defaultValue={300}
          valueLabelDisplay="auto"
          shiftStep={30}
          step={100}
          marks
          min={100}
          max={700}
        />
        <FormControlLabel control={<Checkbox onChange={handleOnChangeIconFill} />} label={<Text name="fill-icons" onlyText />} />
      </Box>
    </Box>
  )
}

export default SettingsPage

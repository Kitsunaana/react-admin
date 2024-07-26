import { useAppDispatch, useAppSelector } from "shared/lib/hooks"
import { RootState } from "app/providers/store"
import {
  FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,
} from "@mui/material"
import { Text } from "shared/ui/text"
import { changeLanguage } from "features/settings/model/settings-slice"

export const ChangeLanguage = () => {
  const dispatch = useAppDispatch()

  const language = useAppSelector((state: RootState) => state.settings.language)

  const onChangeLanguage = (event: SelectChangeEvent) => {
    dispatch(changeLanguage({ language: event.target.value as "ru" | "en" }))
  }

  return (
    <FormControl fullWidth size="small" sx={{ height: "35px !important" }}>
      <InputLabel><Text name="change-language" onlyText /></InputLabel>
      <Select
        value={language}
        label={<Text name="change-language" onlyText />}
        onChange={onChangeLanguage}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="ru">Русский</MenuItem>
      </Select>
    </FormControl>
  )
}

import { useAppDispatch, useAppSelector } from "shared/lib/hooks"
import { RootState } from "app/providers/store"
import {
  FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,
} from "@mui/material"
import { Text } from "shared/ui/text"
import { changeLanguage } from "features/settings/model/settings-slice"
import Autocomplete from "@mui/material/Autocomplete"
import { Input } from "shared/ui/form/input"
import { SelectItem } from "shared/ui/form/select"

const languages = [
  { code: "en", caption: "English" },
  { code: "ru", caption: "Русский" },
]

export const ChangeLanguage = () => {
  const dispatch = useAppDispatch()

  const language = useAppSelector((state: RootState) => state.settings.language)

  return (
    <FormControl fullWidth size="small" sx={{ height: "35px !important" }}>
      <Autocomplete
        value={languages.find((item) => item.code === language)}
        isOptionEqualToValue={(option, value) => option?.caption === value?.caption}
        getOptionLabel={(option) => option.caption}
        options={languages}
        onChange={(event, value) => (
          dispatch(changeLanguage({ language: value?.code as "ru" | "en" }))
        )}
        renderInput={(params) => (
          <Input
            {...params}
            label={<Text name="changeLanguate" onlyText />}
            size="small"
          />
        )}
        renderOption={({ key, ...otherProps }, option) => (
          <SelectItem key={key} {...otherProps}>{option.caption}</SelectItem>
        )}
      />
    </FormControl>
  )
}

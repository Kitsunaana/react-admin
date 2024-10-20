import Autocomplete from "@mui/material/Autocomplete"
import { observer } from "mobx-react-lite"
import { Input } from "shared/ui/form/input"
import { SelectItem } from "shared/ui/form/select"
import { Text } from "shared/ui/text"
import { defaultLanguage } from "../model/const"
import { useSettings } from "../model/context"
import { Languages } from "../model/types"

const languages: Record<Languages, { code: Languages, caption: string }> = {
  en: {
    code: "en",
    caption: "English",
  },
  ru: {
    code: "ru",
    caption: "Русский",
  },
}

export const ChangeLanguage = observer(() => {
  const { settings } = useSettings()

  return (
    <Autocomplete
      options={Object.values(languages)}
      value={languages[settings.language]}
      isOptionEqualToValue={(option, value) => option.code === value.code}
      getOptionLabel={(option) => option.caption}
      onChange={(_, value) => settings.onChangeLanguage(value?.code ?? defaultLanguage)}
      renderInput={(params) => {
        const {
          InputProps: {
            endAdornment,
            ...otherInputProps
          },
          ...otherParams
        } = params

        return (
          <Input
            {...otherParams}
            InputProps={otherInputProps}
            clear={false}
            label={<Text name="changeLanguage" onlyText />}
            size="small"
          />
        )
      }}
      renderOption={({ key, ...otherProps }, option) => (
        <SelectItem key={key} {...otherProps}>{option.caption}</SelectItem>
      )}
    />
  )
})

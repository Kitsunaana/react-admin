import Autocomplete from "@mui/material/Autocomplete"
import { observer } from "mobx-react-lite"
import { Input } from "shared/ui/form/input"
import { SelectItem } from "shared/ui/form/select"
import { Text } from "shared/ui/text"
import { useGetAllLocales } from "entities/alt-name"
import { Skeleton } from "shared/ui/skeleton"
import { useAppSettings } from "shared/lib/app-settings"
import { defaultLanguage } from "../../domain/const"

export const ChangeLanguage = observer(() => {
  const language = useAppSettings((store) => store.language)
  const changeLanguage = useAppSettings((store) => store.changeLanguage)

  const locales = useGetAllLocales()

  if (locales.isFetching || !locales.data) return <Skeleton height={35} />

  return (
    <Autocomplete
      options={locales.data}
      value={locales.localeRecord[language]}
      getOptionLabel={(option) => option.caption}
      isOptionEqualToValue={(option, value) => option.code === value.code}
      onChange={(_, value) => changeLanguage(value?.code ?? defaultLanguage)}
      renderInput={(params) => (
        <Input
          {...params}
          size="small"
          InputProps={{ ...params.InputProps, endAdornment: <div /> }}
          label={<Text name="changeLanguage" onlyText />}
        />
      )}
      renderOption={({ key, ...otherProps }, option) => (
        <SelectItem key={key} {...otherProps}>{option.caption}</SelectItem>
      )}
    />
  )
})

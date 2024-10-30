import { Autocomplete } from "@mui/material"
import { useLocales } from "entities/alt-name"
import { observer } from "mobx-react-lite"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Common } from "shared/types/common"
import { Box } from "shared/ui/box"
import { DescriptionInput } from "shared/ui/description"
import { Input } from "shared/ui/form/input"
import { SelectItem } from "shared/ui/form/select"
import { Mark } from "shared/ui/mark"
import { Text } from "shared/ui/text"
import { useCategoryStores } from "features/categories/dialog/ui/context"

export const CreateEditForm = observer(() => {
  const { t } = useTranslation("translation", { keyPrefix: "global.forms.validate" })
  const { altNamesStore } = useCategoryStores()
  const { locales } = useLocales()
  const methods = useFormContext()

  const excludedLocales = altNamesStore.exclude(locales || [], methods.getValues("locale"))

  return (
    <Box flex gap sx={{ height: 1, pt: 1 }}>
      <Controller
        name="locale"
        rules={{ required: "requiredSelect" }}
        defaultValue={null}
        render={({ field, fieldState: { error } }) => (
          <Autocomplete
            size="small"
            value={field.value}
            onChange={(_, option) => field.onChange(option)}
            options={excludedLocales as Array<Common.Locale & { disabled?: boolean }>}
            getOptionLabel={(option) => (option ? option.caption : "")}
            isOptionEqualToValue={(option, value) => (
              option?.caption === value?.caption
            )}
            renderInput={(props) => (
              <Input
                label={<Text onlyText name="forms.locale" />}
                helperText={error?.message ? t(error.message) : null}
                error={!!error}
                {...props}
              />
            )}
            renderOption={({ key, ...other }, option) => (
              <SelectItem key={key} disabled={option?.disabled} {...other}>
                <Mark style={{ fontSize: 12 }}>{option.altName}</Mark>
                <div>{option.caption}</div>
              </SelectItem>
            )}
          />
        )}
      />

      <Controller
        name="caption"
        rules={{
          required: "required",
          minLength: { value: 3, message: "minLength" },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            size="small"
            error={!!error}
            label={<Text onlyText name="forms.caption" />}
            helperText={error?.message ? t(error.message, { value: 3 }) : null}
          />
        )}
      />

      <DescriptionInput name="forms.description" />
    </Box>
  )
})

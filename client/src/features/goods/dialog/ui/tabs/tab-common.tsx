import { useLang } from "shared/context/lang"
import { useTranslation } from "react-i18next"
import { Box } from "shared/ui/box"
import { Controller } from "react-hook-form"
import Autocomplete from "@mui/material/Autocomplete"
import { Input } from "shared/ui/form/input"
import { Text } from "shared/ui/text"
import { SelectItem } from "shared/ui/form/select"
import * as React from "react"
import { useGetAllCategories } from "features/goods/filters/ui/filters"
import { Skeleton } from "@mui/material"

export const TabCommon = () => {
  const langBase = useLang()?.lang ?? "global"
  const { t } = useTranslation("translation", { keyPrefix: `${langBase}.validate` })

  const { categories, isLoading } = useGetAllCategories()

  return (
    <Box flex ai gap sx={{ py: 1 }}>
      {isLoading ? (
        <Skeleton variant="rectangular" sx={{ borderRadius: 2 }} width="100%" height={35} />
      ) : (
        <Controller
          name="category"
          rules={{ required: "requiredOption" }}
          render={({ field, fieldState: { error } }) => (
            <Autocomplete
              onChange={(_, value) => field.onChange(value)}
              fullWidth
              size="small"
              value={field.value ?? null}
              options={categories ?? []}
              getOptionLabel={(option) => option?.caption}
              isOptionEqualToValue={(option, value) => option?.caption === value?.caption}
              renderInput={(params) => (
                <Input
                  {...params}
                  label={<Text onlyText name="forms.category" />}
                  error={!!error}
                  helperText={error?.message ? t(error.message) : ""}
                />
              )}
              renderOption={({ key, ...other }, option) => (
                <SelectItem key={key} {...other}>
                  <Box />
                  {option.caption}
                </SelectItem>
              )}
            />
          )}
        />
      )}

      <Controller
        name="caption"
        rules={{
          required: "required",
          minLength: { value: 3, message: "minLength" },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            value={field.value ?? ""}
            size="small"
            fullWidth
            error={!!error}
            label={<Text onlyText name="forms.caption" />}
            helperText={error?.message ? t(error.message, { value: 3 }) : ""}
          />
        )}
      />
    </Box>
  )
}

import { Autocomplete } from "@mui/material"
import { icons, Tag } from "entities/tag"
import { useTags } from "entities/tag/queries/use-tags"
import { ReactNode } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Box } from "shared/ui/box"
import { Input } from "shared/ui/form/input"
import { ColorInput } from "shared/ui/form/input-color"
import { SelectItem } from "shared/ui/form/select"
import { ListboxComponent } from "shared/ui/form/select-virtualize"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"

export const TagForm = () => {
  const { getValues, watch } = useFormContext()
  const { t } = useTranslation()

  const caption = watch("caption") ?? getValues("caption")
  const icon = watch("icon") ?? getValues("icon")
  const color = watch("color") ?? getValues("color")

  const { tags, isLoadingGet } = useTags()

  if (isLoadingGet) return <Box>Loading</Box>

  return (
    <Box flex ai gap grow sx={{ py: 1 }}>
      <Box flex row jc>
        <Tag
          caption={caption}
          icon={icon}
          color={color}
        />
      </Box>

      <Controller
        name="caption"
        rules={{ required: "validate.required" }}
        render={({ field, fieldState: { error } }) => (
          <Autocomplete
            size="small"
            freeSolo
            fullWidth
            value={field.value}
            onChange={(_, option) => field.onChange(option)}
            options={tags ?? []}
            renderInput={(props) => (
              <Input
                {...props}
                {...field}
                onChange={(event) => field.onChange(event)}
                label={<Text onlyText name="forms.tag" />}
                helperText={error?.message ? t(error.message) : null}
                error={!!error}
              />
            )}
            renderOption={({ key, ...other }, option) => (
              <SelectItem key={key} {...other}>
                {option}
              </SelectItem>
            )}
          />
        )}
      />

      <Box flex row gap sx={{ width: 1 }}>
        <Controller
          name="icon"
          render={({ field }) => (
            <Autocomplete
              size="small"
              sx={{ width: "70%" }}
              value={field.value}
              onChange={(_, option) => field.onChange(option)}
              disableListWrap
              ListboxComponent={ListboxComponent}
              options={icons}
              renderInput={(params) => (
                <Input
                  {...params}
                  label={<Text onlyText name="forms.icon" />}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: field.value ? (
                      <Icon sx={{ width: 23, height: 23 }}>{field.value}</Icon>
                    ) : null,
                  }}
                />
              )}
              renderOption={(props, option, state) => (
                [props, option, state.index] as ReactNode
              )}
            />
          )}
        />

        <Controller
          name="color"
          render={({ field }) => (
            <ColorInput
              {...field}
              sx={{ width: "30%" }}
              label={<Text onlyText name="forms.color" />}
              PopoverProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "center",
                },
              }}
            />
          )}
        />
      </Box>
    </Box>
  )
}

import { Autocomplete } from "@mui/material"
import { icons } from "entities/tag"
import { ReactNode } from "react"
import { Controller } from "react-hook-form"
import { Input } from "shared/ui/form/input"
import { ColorInput } from "shared/ui/form/input-color"
import { SelectItem } from "shared/ui/form/select"
import { ListboxComponent } from "shared/ui/form/select-virtualize"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import { FormData } from "../../view-model/use-tag-form"
import { FormBottom, IconSelect } from "./styles"

export const DefaultFields = ({
  tags,
  isLoading,
  defaultValue,
}: {
  tags: string[]
  isLoading: boolean
  defaultValue: FormData
}) => (
  <>
    <Controller
      name="caption"
      defaultValue={defaultValue.caption}
      rules={{
        required: "requiredSelect",
        minLength: {
          message: "minLength",
          value: 3,
        },
      }}
      render={({ field, fieldState }) => (
        <Autocomplete
          freeSolo
          fullWidth
          size="small"
          value={field.value}
          disabled={isLoading}
          onChange={(_, option) => field.onChange(option)}
          options={tags}
          renderOption={({ key, ...other }, option) => (
            <SelectItem key={key} {...other}>{option}</SelectItem>
          )}
          renderInput={(props) => (
            <Input
              {...props}
              {...field}
              label={<Text onlyText name="forms.tag" />}
              error={Boolean(fieldState.error)}
              onChange={(event) => field.onChange(event)}
              helperText={{
                name: fieldState.error?.message ?? "requiredSelect",
                langBase: "validate",
              }}
            />
          )}
        />
      )}
    />

    <FormBottom>
      <Controller
        name="icon"
        defaultValue={defaultValue.icon}
        render={({ field }) => (
          <IconSelect
            size="small"
            value={field.value}
            onChange={(_, option) => field.onChange(option)}
            disableListWrap
            ListboxComponent={ListboxComponent}
            options={icons}
            renderOption={(props, option, state) => [props, option, state.index] as ReactNode}
            renderInput={(params) => (
              <Input
                {...params}
                label={<Text onlyText name="forms.icon" />}
                InputProps={{
                  ...params.InputProps,
                  startAdornment:
                    field.value
                      ? (<Icon>{field.value}</Icon>)
                      : null,
                }}
              />
            )}
          />
        )}
      />

      <Controller
        name="color"
        defaultValue={defaultValue.color}
        render={({ field }) => (
          <ColorInput
            {...field}
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
    </FormBottom>
  </>
)

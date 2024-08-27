import { Autocomplete } from "@mui/material"
import icons from "entities/tag/assets/icons.json"
import { Input } from "shared/ui/form/input"
import { Text } from "shared/ui/text"
import { Icon } from "shared/ui/icon"
import React from "react"
import { Controller } from "react-hook-form"
import { ListboxComponent } from "shared/ui/form/select-virtualize"

export const TagInputIcon = () => (
  <Controller
    name="icon"
    render={({ field }) => (
      <Autocomplete
        size="small"
        sx={{ width: "70%" }}
        value={field.value}
        onChange={(event, option) => field.onChange(option)}
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
          [props, option, state.index] as React.ReactNode
        )}
      />
    )}
  />
)

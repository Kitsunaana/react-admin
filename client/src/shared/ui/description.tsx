import { Controller } from "react-hook-form"
import { Input } from "shared/ui/form/input"
import { Text } from "shared/ui/text"

interface DescriptionInputProps {
  name?: string
  defaultValue?: unknown
}

export const DescriptionInput = ({ name, defaultValue }: DescriptionInputProps) => (
  <Controller
    defaultValue={defaultValue}
    name="description"
    render={(({ field }) => (
      <Input
        {...field}
        fullWidth
        value={field.value ?? ""}
        label={<Text name={name ?? "description"} />}
        multiline
        rows="10"
        sx={{
          "& .MuiInputBase-root": {
            py: 0.5,
          },
        }}
      />
    ))}
  />
)

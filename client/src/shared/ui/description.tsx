import { alpha } from "@mui/material"
import { styled } from "@mui/material/styles"
import { Controller, useFormContext } from "react-hook-form"
import { Input } from "shared/ui/form/input"
import { Text } from "shared/ui/text"

const StyledPreview = styled(Text)(({ theme }) => ({
  border: `1px solid ${alpha(theme.palette.grey["600"], 0.5)}`,
  padding: 8,
  borderRadius: 8,
}))

export const Preview = () => {
  const { watch } = useFormContext()
  const description = watch("description")

  return description && (
    <StyledPreview caption={description} />
  )
}

interface DescriptionInputProps {
  name?: string
}

export const DescriptionInput = ({ name }: DescriptionInputProps) => (
  <Controller
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

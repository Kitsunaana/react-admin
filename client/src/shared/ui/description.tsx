import { useFormContext } from "react-hook-form"
import { memo } from "react"
import { Divider } from "shared/ui/divider"
import { Input } from "shared/ui/input"
import { Text } from "shared/ui/text"
import { alpha } from "@mui/material"
import * as React from "react"

export const Preview = () => {
  const { watch } = useFormContext()

  const description = watch("description")

  return description && (
    <Text
      sx={{
        border: ({ palette }) => `1px solid ${alpha(palette.grey["600"], 0.5)}`,
        px: 1,
        py: 1,
        borderRadius: 1,
      }}
      caption={description}
    />
  )
}

export const DescriptionInput = () => {
  const { register } = useFormContext()

  return (
    <Input
      {...register("description")}
      fullWidth
      label="Описание"
      multiline
      rows="10"
      sx={{
        "& .MuiInputBase-root": {
          py: 0.5,
        },
      }}
    />
  )
}

export const Description = memo(() => (
  <>
    <DescriptionInput />
    <Divider sx={{ my: 1 }}>Предпросмотр</Divider>
    <Preview />
  </>
))

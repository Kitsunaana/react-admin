import {
  FormState, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormWatch,
} from "react-hook-form"
import { memo, useMemo } from "react"
import { Divider } from "shared/ui/Divider"
import { Input } from "shared/ui/Input"
import { Text } from "shared/ui/Text"
import { alpha } from "@mui/material"
import * as React from "react"

export interface Option {
  value: string
  icon?: string
  tab?: number
}

interface UseFormProps {
  category: Option
  caption: Option
  description: string
}

interface ParametersProps {
  errors: FormState<UseFormProps>["errors"]
  register: UseFormRegister<UseFormProps>
  getValues: UseFormGetValues<UseFormProps>
  setValue: UseFormSetValue<UseFormProps>
}

interface DescriptionProps extends ParametersProps {}

export const Description = memo((props: DescriptionProps & { watch: UseFormWatch<UseFormProps> }) => {
  const {
    errors, register, getValues, setValue, watch,
  } = props

  const { ...other } = register("description")

  const description = getValues("description").replaceAll("\n", " ")

  const dividerRender = useMemo(() => <Divider sx={{ my: 1 }}>Предпросмотр</Divider>, [])

  return (
    <>
      <Input
        fullWidth
        label="Описание"
        multiline
        rows="10"
        sx={{
          "& .MuiInputBase-root": {
            py: 0.5,
          },
        }}
        {...other}
      />
      {dividerRender}
      {description && (
        <Text
          sx={{
            border: ({ palette }) => `1px solid ${alpha(palette.grey["600"], 0.5)}`,
            px: 1,
            py: 1,
            borderRadius: 1,
          }}
          caption={description}
        />
      )}
    </>
  )
})

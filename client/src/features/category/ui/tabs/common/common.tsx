import { Controller } from "react-hook-form"
import { Input } from "shared/ui/form/input"
import { Text } from "shared/ui/text"
import { useCategoryFormContext } from "../../../view-model/form/use-category-form"
import { useCommonForm } from "../../../view-model/form/use-common-form"
import { Container, Description } from "./styles"

export const Common = () => {
  const defaultValue = useCategoryFormContext((state) => state.defaultValue)
  const control = useCategoryFormContext((state) => state.control)

  const commonForm = useCommonForm()

  return (
    <Container>
      <Controller
        name="caption"
        control={control}
        defaultValue={defaultValue.caption}
        rules={{
          required: "required",
          minLength: {
            message: "minLength",
            value: 3,
          },
        }}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            fullWidth
            size="small"
            error={Boolean(fieldState.error)}
            label={<Text onlyText name="forms.caption" />}
            onBlur={commonForm.handleCaptionBlur}
            onClear={commonForm.handleCaptionClear}
            helperText={{
              name: fieldState.error?.message ?? "required",
              langBase: "validate",
              values: { value: 3 },
            }}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        defaultValue={defaultValue.description}
        render={({ field }) => (
          <Description
            {...field}
            multiline
            fullWidth
            rows="10"
            label={<Text onlyText name="forms.description" />}
            onBlur={commonForm.handleDescriptionBlur}
            onClear={commonForm.handleDescriptionClear}
          />
        )}
      />
    </Container>
  )
}

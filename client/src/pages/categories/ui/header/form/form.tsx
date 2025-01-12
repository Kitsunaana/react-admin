import { Controller } from "react-hook-form"
import { Input } from "shared/ui/form/input"
import { Text } from "shared/ui/text"
import { useHeaderForm } from "../../../view-model/use-header-form"

export const Form = () => {
  const headerForm = useHeaderForm()

  return (
    <Controller
      control={headerForm.control}
      name="search"
      render={({ field }) => (
        <Input
          {...field}
          fullWidth
          size="small"
          onClear={headerForm.handleClear}
          onFocus={headerForm.handleFocus}
          onBlur={headerForm.handleBlur}
          label={<Text name="search" />}
        />
      )}
    />
  )
}

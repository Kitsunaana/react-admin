import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Input } from "shared/ui/form/input"
import { Box } from "shared/ui/box"
import { Text } from "shared/ui/text"
import { eventBus } from "shared/lib/event-bus"
import { updateCaption } from "features/categories/model/event"

export const TabCommon = () => {
  const { t } = useTranslation("translation", { keyPrefix: "global.forms.validate" })

  return (
    <Box flex ai gap sx={{ mt: 1 }}>
      <Controller
        name="caption"
        rules={{
          required: "required",
          minLength: { value: 3, message: "minLength" },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            size="small"
            fullWidth
            error={!!error}
            label={<Text onlyText name="forms.caption" />}
            helperText={error?.message ? t(error.message, { value: 3 }) : ""}
            onChange={(event) => {
              field.onChange(event)
              eventBus.emit(updateCaption({ caption: event.target.value }))
            }}
          />
        )}
      />

      <Controller
        name="description"
        defaultValue=""
        render={({ field }) => (
          <Input
            {...field}
            fullWidth
            label={<Text onlyText name="forms.description" />}
            multiline
            rows="10"
            sx={{
              "& .MuiInputBase-root": {
                py: 0.25,
              },
            }}
          />
        )}
      />
    </Box>
  )
}

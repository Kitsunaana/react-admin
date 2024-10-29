import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Input } from "shared/ui/form/input"
import { Box } from "shared/ui/box"
import { Text } from "shared/ui/text"
import { eventBus } from "shared/lib/event-bus"
import { updateCaption } from "features/categories/@dialog/domain/event"
import { useCategoryStores } from "features/categories/@dialog/ui/context"
import { nanoid } from "nanoid"

interface TabCommonProps {
  tab: number
}

export const TabCommon = ({ tab }: TabCommonProps) => {
  const { t } = useTranslation("translation", { keyPrefix: "global.forms.validate" })

  const categoryStores = useCategoryStores()

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
            onBlur={(event) => {
              categoryStores.historyStore.recordEvent({
                id: nanoid(),
                tab,
                type: "changeCaption",
                value: event.target.value,
              })
            }}
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
            onBlur={(event) => {
              categoryStores.historyStore.recordEvent({
                id: nanoid(),
                tab,
                type: "changeDescription",
                value: event.target.value,
              })
            }}
          />
        )}
      />
    </Box>
  )
}

import * as React from "react"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useLang } from "shared/context/Lang"
import { Input } from "shared/ui/form/input"
import { Box } from "shared/ui/box"
import { Text } from "shared/ui/text"
import { createRoute, eventBus } from "shared/lib/event-bus"

interface CommonTabProps {
  langBase?: string
}

interface UpdateCaption {
  caption?: string,
  bgColor?: string,
  color?: string
  blur?: number
}

export const updateCaption = createRoute("updateCaption")
  .withParams<UpdateCaption>()

export const TabCommon = (props: CommonTabProps) => {
  const { langBase: langBaseProps } = props

  const langBase = langBaseProps ?? useLang()
  const { t } = useTranslation("translation", { keyPrefix: `${langBase}.validate` })

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
                py: 0.5,
              },
            }}
          />
        )}
      />
    </Box>
  )
}

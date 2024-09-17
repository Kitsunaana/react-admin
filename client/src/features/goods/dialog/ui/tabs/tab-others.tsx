import { useLang } from "shared/context/lang"
import { Box } from "shared/ui/box"
import { Controller } from "react-hook-form"
import { Input } from "shared/ui/form/input"
import { Text } from "shared/ui/text"
import { Checkbox, FormControlLabel } from "@mui/material"
import * as React from "react"

const checkboxes = [
  "notCalculation", "isNew", "isHot", "isConsumable",
]

export const TabOthers = () => {
  const readLangBase = useLang()
  const langBase = `${readLangBase}.forms`

  return (
    <Box flex gap sx={{ py: 1 }}>
      <Box flex row ai gap>
        <Controller
          name="article"
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              size="small"
              fullWidth
              label={<Text langBase={langBase} name="article" onlyText />}
            />
          )}
        />
        <Controller
          name="label"
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              size="small"
              fullWidth
              label={<Text langBase={langBase} name="label" onlyText />}
            />
          )}
        />
      </Box>
      <Controller
        name="deliveryTime"
        defaultValue=""
        render={({ field }) => (
          <Input
            {...field}
            size="small"
            fullWidth
            label={<Text langBase={langBase} name="deliveryTime" onlyText />}
          />
        )}
      />
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
        {checkboxes.map((name) => (
          <Box key={name}>
            <Controller
              name={name}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  {...field}
                  onChange={(_, checked) => field.onChange(checked)}
                  checked={field.value}
                  control={<Checkbox />}
                  label={<Text langBase={langBase} name={name} onlyText />}
                />
              )}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

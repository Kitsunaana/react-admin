import * as React from "react"
import {
  memo,
  useEffect, useState,
} from "react"
import {
  Controller, FormProvider, useForm, useFormContext,
} from "react-hook-form"
import { addEvent } from "shared/lib/event"
import { TabsContainer } from "shared/ui/tabs-container"
import { Box } from "shared/ui/box"
import { useLang } from "shared/context/Lang"
import { useTranslation } from "react-i18next"
import { TabPanel } from "shared/ui/tab-panel"
import { DescriptionInput } from "shared/ui/description"
import { Input } from "shared/ui/input"
import { SxProps } from "@mui/system"
import { Theme } from "@mui/material"
import { DialogEdit } from "shared/ui/dialog/dialog-edit"
import {
  createCategoryOptions,
  getByIdCategoryOptions,
  updateCategoryOptions,
} from "features/categories/create-and-edit/queries/queries"
import { tabs } from "features/categories/create-and-edit/model/constants"

export const CaptionInput = (props: { sx: SxProps<Theme> }) => {
  const { sx } = props

  const { control, trigger } = useFormContext()

  const langBase = useLang()?.lang

  const { t } = useTranslation("translation", { keyPrefix: "global.message" })

  return (
    <Controller
      name="caption"
      control={control}
      defaultValue=""
      rules={{ required: "required", minLength: { value: 3, message: "minLength" } }}
      render={({ field: { value, onChange, ...other }, fieldState: { error } }) => (
        <Input
          {...other}
          sx={sx}
          onChange={(event) => {
            onChange(event)
            trigger("caption")
          }}
          value={value}
          label={`${langBase}.caption`}
          size="small"
          fullWidth
          error={!!error}
          helperText={error?.message ? t(error.message, { value: 3 }) : ""}
        />
      )}
    />
  )
}

export const Container = memo((props: { tab: number, langBase?: string }) => {
  const { tab: tabProps, langBase: langBaseProps } = props

  const lang = useLang()
  const langBase = langBaseProps ?? lang?.lang

  const [tab, setTab] = useState(tabProps)

  useEffect(() => addEvent(`${langBase}.changeTab` as any, ({ tab }: { tab: number }) => {
    setTab(tab)
  }), [])

  return (
    <TabPanel value={tab} index={0}>
      <CaptionInput sx={{ mb: 1 }} />
      <DescriptionInput />
    </TabPanel>
  )
})

export const Dialog = () => {
  const tabDefault = 0
  const langBase = "catalog.dialog"

  const methods = useForm({
    defaultValues: {
      caption: "",
      description: "",
    },
  })

  return (
    <FormProvider {...methods}>
      <DialogEdit
        onCreateOptions={createCategoryOptions}
        onUpdateOptions={updateCategoryOptions}
        onGetByIdOptions={getByIdCategoryOptions}
        container={(
          <Box flex gap>
            <TabsContainer
              langBase={langBase}
              tabs={tabs}
              tab={tabDefault}
              requiredFields={["caption"]}
            />
            <Container
              langBase={langBase}
              tab={tabDefault}
            />
          </Box>
        )}
      />
    </FormProvider>
  )
}

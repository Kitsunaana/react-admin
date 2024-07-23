import * as React from "react"
import { memo, useEffect, useState } from "react"
import { Tab, Tabs as MUITabs } from "@mui/material"
import { TabLabel } from "shared/ui/TabLabel"
import {
  Control,
  FormState, UseFormGetFieldState, UseFormGetValues, useFormState,
} from "react-hook-form"
import { addEvent } from "shared/lib/event"

const tabs = [
  { id: 0, caption: "Общие параметры", icon: "warning" },
  { id: 1, caption: "Описание", icon: "description" },
  { id: 2, caption: "Фото", icon: "photo" },
  { id: 3, caption: "Прочее", icon: "other" },
  { id: 4, caption: "Характеристики", icon: "characteristic" },
  { id: 5, caption: "Алтернативные названия", icon: "alternativeName" },
]

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

interface TabsProps {
  tab: number | string
  onChange: (event: React.SyntheticEvent, newValue: number) => void
  errors: FormState<UseFormProps>["errors"]
  getValues: UseFormGetValues<UseFormProps>
  getFieldState: UseFormGetFieldState<UseFormProps>
  control: Control<UseFormProps, any>
}

export const Tabs = memo((props: TabsProps) => {
  const {
    tab, onChange, errors: propsError, getValues, getFieldState, control,
  } = props

  const { errors } = useFormState({ control })

  const tabWithErrors = Object.keys(getValues()).filter((property) => errors[property])
    .map((property) => getValues()[property]?.tab)

  return (
    <MUITabs
      value={tab}
      onChange={(event, value) => {
        onChange(event, value)
      }}
      variant="scrollable"
      scrollButtons="auto"
      TabIndicatorProps={{
        sx: {
          top: 0,
          height: 3,
          borderRadius: 2,
          ...(tabWithErrors.includes(tab) ? {
            backgroundColor: ({ palette }) => palette.warning.main,
          } : {}),
        },
      }}
      sx={{
        minHeight: 0,
        "& .MuiTabScrollButton-root": {
          opacity: "0.75 !important",
          width: "auto",
          "&.Mui-disabled": {
            opacity: "0.25 !important",
          },
        },
      }}
    >
      {tabs.map((tab) => {
        const isError = tabWithErrors.includes(tab.id)

        return (
          <Tab
            value={tab.id}
            key={tab.id}
            sx={{
              p: 1.2,
              minHeight: 0,
              backgroundImage: ({ background }) => (isError ? background.gradient.warning : null),
              color: ({ palette }) => (isError ? palette.warning.main : null),
              "&.Mui-selected": {
                backgroundImage: ({ background }) => (isError
                  ? background.gradient.warning
                  : background.gradient.primary),
                color: ({ palette }) => (isError ? palette.warning.main : null),
              },
            }}
            label={(
              <TabLabel icon={tab.icon} caption={tab.caption} />
            )}
          />
        )
      })}
    </MUITabs>
  )
})

import {
  Controller, FormProvider, useForm, useFormContext,
} from "react-hook-form"
import React, { memo, useEffect } from "react"
import { Box } from "shared/ui/Box"
import { Input } from "shared/ui/Input"
import {
  IconButton,
} from "@mui/material"
import { Icon } from "shared/ui/Icon"
import { useTranslation } from "react-i18next"
import { Select } from "shared/ui/Select"
import { dispatch } from "shared/lib/event"

export interface Option {
  id?: number
  value: string | null
  icon?: string
  default?: boolean
}

export interface UseFormProps {
  category: Option
  typeGood: Option
  search: string
}

const categoryList = [{ id: 1, value: "option1" }, { id: 2, value: "option2" }]
const typeGoodList = [
  {
    id: 1,
    value: "option1",
    icon: "consumable",
  },
  {
    id: 2,
    value: "option2",
    icon: "typeGood",
    default: true,
  },
]

const getParams = () => window.location.search
  .replace("?", "")
  .split("&")
  .map((search) => search.split("="))
  .reduce((prev, current) => {
    prev[current[0]] = current[1]
    return prev
  }, {})

export const CategorySelect = () => {
  const { control } = useFormContext<UseFormProps>()

  return (
    <Controller
      name="category.value"
      control={control}
      render={({ field: { value, onChange, ...other } }) => (
        <Select
          {...other}
          value={value ?? null}
          onChange={(_, value) => { onChange(value) }}
          options={categoryList}
          sx={{ width: 1 }}
          InputProps={{
            fullWidth: true,
            label: "Категория",
          }}
        />
      )}
    />
  )
}

export const TypeGoodSelect = () => {
  const { control } = useFormContext<UseFormProps>()

  return (
    <Controller
      name="typeGood.value"
      control={control}
      render={({ field: { value, onChange, ...other } }) => (
        <Select
          {...other}
          value={value ?? null}
          onChange={(_, value) => { onChange(value) }}
          options={typeGoodList}
          sx={{ width: 1 }}
          InputProps={{
            fullWidth: true,
            label: "Тип товара",
          }}
        />
      )}
    />
  )
}

export const Header = memo(() => {
  const params = getParams()

  const findCategory = categoryList.find((filter) => filter.value === (params as any).category)
  const findTypeGood = typeGoodList.find((filter) => filter.value === (params as any).typeGood)

  const methods = useForm<UseFormProps>({
    defaultValues: {
      category: findCategory ?? { value: null },
      typeGood: findTypeGood ?? typeGoodList[1],
      search: (params as any).search ?? "",
    },
  })

  return (
    <FormProvider {...methods}>
      <Box flex row ai gap>
        <Input
          {...methods.register("search")}
          sx={{ flexGrow: 1 }}
          size="small"
          label="Поиск"
        />
        <Box flex row>
          <IconButton sx={{ p: 0.5 }}>
            <Icon
              name="reload"
              sx={{
                fontSize: 20,
                color: ({ palette }) => palette.primary.main,
              }}
            />
          </IconButton>
          <IconButton
            sx={{ p: 0.5 }}
            onClick={() => {
              dispatch("dialog.goods.create" as any)
            }}
          >
            <Icon
              name="add"
              sx={{
                fontSize: 20,
                color: ({ palette }) => palette.success.light,
              }}
            />
          </IconButton>
          <IconButton sx={{ p: 0.5 }}>
            <Icon
              name="back"
              sx={{
                fontSize: 20,
                color: ({ palette }) => palette.warning.main,
              }}
            />
          </IconButton>
        </Box>
      </Box>
      <Box ai flex row gap grow sx={{ width: 1 }}>
        <CategorySelect />
        <TypeGoodSelect />
      </Box>
    </FormProvider>
  )
})

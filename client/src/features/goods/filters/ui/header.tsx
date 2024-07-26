import {
  Controller, FormProvider, useForm,
} from "react-hook-form"
import React, { memo, useEffect, useState } from "react"
import { Box } from "shared/ui/box"
import { Input } from "shared/ui/input"
import {
  IconButton,
} from "@mui/material"
import { Icon } from "shared/ui/icon"
import { addEvent, dispatch } from "shared/lib/event"
import { ControllerSelect } from "shared/ui/controller-select"
import { actionParams } from "shared/lib/params"
import queryString from "query-string"
import { z } from "zod"

export interface Option {
  id?: number
  value: string | null
  icon?: string
  default?: boolean
}

export interface UseFormProps {
  category: Option
  typeGood: Option
  search: string | null
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
  },
]

const paramsSchema = z.object({
  category: z.string().optional().nullable().default(null),
  typeGood: z.string().optional().default("option2"),
  search: z.string().optional().default(""),
}).strict()

type Params = z.infer<typeof paramsSchema>

export const Header = memo(() => {
  const readParams = paramsSchema.parse(queryString.parseUrl(window.location.search).query)

  const methods = useForm<Params>({
    defaultValues: {
      category: readParams.category,
      typeGood: readParams.typeGood,
      search: readParams.search,
    },
  })

  useEffect(() => addEvent("catalog/goods" as any, (data) => {
    const url = data?.params ? `?${data.params}` : window.location.search

    const parseParams = paramsSchema.parse(queryString.parseUrl(url).query);

    (Object.keys(parseParams) as Array<keyof UseFormProps>).forEach((key) => {
      methods.setValue(key, parseParams[key])
    })
  }), [])

  const onSubmit = (data: Params) => {
    console.log(data)
  }

  useEffect(() => window.addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
      methods.handleSubmit(onSubmit)()
    }
  }), [])

  return (
    <FormProvider {...methods}>
      <Box flex row ai gap>
        <Controller
          name="search"
          render={({ field }) => (
            <Input
              {...field}
              sx={{ flexGrow: 1 }}
              size="small"
              label="Поиск"
            />
          )}
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
          <IconButton
            sx={{ p: 0.5 }}
            onClick={() => {
              window.history.back()
            }}
          >
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
        <ControllerSelect
          name="category"
          options={categoryList}
          sx={{ width: 1 }}
          InputProps={{ fullWidth: true, label: "Категория" }}
          onChange={(value) => {
            actionParams.push("category", value)
            methods.handleSubmit(onSubmit)()
          }}
        />
        <ControllerSelect
          name="typeGood"
          options={typeGoodList}
          sx={{ width: 1 }}
          InputProps={{ fullWidth: true, label: "Тип товара" }}
          onChange={(value) => {
            actionParams.push("typeGood", value)
            methods.handleSubmit(onSubmit)()
          }}
        />
      </Box>
    </FormProvider>
  )
})

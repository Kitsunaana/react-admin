import {
  Controller, FormProvider, useForm,
} from "react-hook-form"
import React, {
  memo, ReactNode, useEffect,
} from "react"
import { Box } from "shared/ui/box"
import { Input } from "shared/ui/input"
import { addEvent } from "shared/lib/event"
import { z } from "zod"
import { Select } from "shared/ui/select"
import { IconButton } from "shared/ui/icon-button"
import { BackButton } from "shared/ui/back-button"

export interface Option {
  id?: number
  value: string | null
  icon?: string
  default?: boolean
}

export interface UseFormProps {
  category: Option
  typeGood: Option
  search: { value: string | null }
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

interface FiltersProps {
  createButton: ReactNode
}

const paramsSchema = z.object({
  category: z.string().optional().nullable().default(null),
  typeGood: z.string().optional().default("option2"),
  search: z.string().optional().default(""),
}).strict()

export const Filters = memo((props: FiltersProps) => {
  const { createButton } = props

  const readParams = { category: "", typeGood: "", search: "" }

  const methods = useForm<UseFormProps>({
    defaultValues: {
      category: { value: readParams.category },
      typeGood: { value: readParams.typeGood },
      search: { value: readParams.search },
    },
  })

  useEffect(() => addEvent("catalog/goods" as any, (data) => {
    const url = data?.params ? `?${data.params}` : window.location.search

    const parseParams = { category: "", typeGood: "", search: "" };

    (Object.keys(parseParams) as Array<keyof UseFormProps>).forEach((key) => {
      methods.setValue(key, { value: parseParams[key] })
    })
  }), [])

  const onSubmit = (data: UseFormProps) => {
    // console.log(data)
  }

  useEffect(() => {
    const event = (event) => {
      if (event.code === "Enter") {
        const search = methods.getValues("search")
        // if (search?.value) actionParams.push("search", search.value)

        methods.handleSubmit(onSubmit)()
      }
    }

    window.addEventListener("keydown", event)

    return () => window.removeEventListener("keydown", event)
  }, [])

  return (
    <FormProvider {...methods}>
      <Box flex row ai gap>
        <Controller
          name="search.value"
          render={({ field }) => (
            <Input
              {...field}
              setValue={methods.setValue}
              onClear={() => {
                // actionParams.push("search", null)
              }}
              sx={{ flexGrow: 1 }}
              size="small"
              label="Поиск"
            />
          )}
        />
        <Box flex row>
          <IconButton name="reload" color="primary" fontSize={20} />
          {createButton}
          <BackButton />
        </Box>
      </Box>
      <Box ai flex row gap grow sx={{ width: 1 }}>
        <Controller
          name="category.value"
          control={methods.control}
          render={({ field: { onChange, ...otherFields } }) => (
            <Select
              {...otherFields}
              options={categoryList}
              onChange={(_, value) => {
                onChange(value)
                // actionParams.push("category", value)
                methods.handleSubmit(onSubmit)()
              }}
              sx={{ width: 1 }}
              InputProps={{
                fullWidth: true,
                label: "Категория",
              }}
            />
          )}
        />

        <Controller
          name="typeGood.value"
          control={methods.control}
          render={({ field: { onChange, ...otherFields } }) => (
            <Select
              {...otherFields}
              options={typeGoodList}
              onChange={(_, value) => {
                onChange(value)
                // actionParams.push("typeGood", value)
                methods.handleSubmit(onSubmit)()
              }}
              sx={{ width: 1 }}
              InputProps={{
                fullWidth: true,
                label: "Тип товара",
              }}
            />
          )}
        />
      </Box>
    </FormProvider>
  )
})

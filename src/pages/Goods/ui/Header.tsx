import { useForm } from "react-hook-form"
import React, { memo, useEffect } from "react"
import { Box } from "shared/ui/Box"
import { Input } from "shared/ui/Input"
import {
  IconButton,
} from "@mui/material"
import { Icon } from "shared/ui/Icon"
import { Select } from "shared/ui/Select"

export interface Option {
  id?: number
  value: string
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
const filterList: Array<{ name: keyof UseFormProps; caption: string; options: Option[] }> = [
  { name: "category", caption: "Категория", options: categoryList },
  { name: "typeGood", caption: "Тип товара", options: typeGoodList },
]

const getParams = () => window.location.search
  .replace("?", "")
  .split("&")
  .map((search) => search.split("="))
  .reduce((prev, current) => {
    prev[current[0]] = current[1]
    return prev
  }, {})

export const Header = memo(() => {
  const params = getParams()

  const findCategory = categoryList.find((filter) => filter.value === (params as any).category)
  const findTypeGood = typeGoodList.find((filter) => filter.value === (params as any).typeGood)

  const {
    register, handleSubmit, watch, setValue, getValues,
  } = useForm<UseFormProps>({
    defaultValues: {
      category: findCategory ?? { value: "" },
      typeGood: findTypeGood ?? typeGoodList[1],
      search: (params as any).search ?? "",
    },
  })

  const onSubmit = (data: UseFormProps) => {
    // console.log(data)
  }

  const search = watch("search")
  const filterByCategory = watch("category")
  const filterByTypeGood = watch("typeGood")

  useEffect(() => window.addEventListener("popstate", (...data) => {
    console.log(data)
  }), [])

  useEffect(() => {
    handleSubmit(onSubmit)()
  }, [search, filterByCategory, filterByTypeGood])

  return (
    <>
      <Box flex row ai gap>
        <Input
          {...register("search")}
          sx={{ flexGrow: 1 }}
          size="small"
          label="Поиск"
        />
        <Box flex row>
          <IconButton sx={{ p: 0.5 }}>
            <Icon name="reload" sx={{ fontSize: 20, color: ({ palette }) => palette.primary.main }} />
          </IconButton>
          <IconButton sx={{ p: 0.5 }}>
            <Icon name="add" sx={{ fontSize: 20, color: ({ palette }) => palette.success.light }} />
          </IconButton>
          <IconButton sx={{ p: 0.5 }}>
            <Icon name="back" sx={{ fontSize: 20, color: ({ palette }) => palette.warning.main }} />
          </IconButton>
        </Box>
      </Box>
      <Box ai flex row gap>
        {filterList.map((filter) => (
          <Select
            key={filter.name}
            clear
            value={getValues(filter.name) as Option}
            setValue={setValue}
            options={filter.options}
            inputProps={{ size: "small", label: filter.caption }}
            {...register(filter.name)}
          />
        ))}
      </Box>
    </>
  )
})

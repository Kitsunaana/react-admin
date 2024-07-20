import { useForm } from "react-hook-form"
import React, { useEffect } from "react"
import { Box } from "shared/ui/Box"
import { Input } from "shared/ui/Input"
import { IconButton } from "@mui/material"
import { Icon } from "shared/ui/Icon"
import { Select } from "shared/ui/Select"

interface Option {
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

export const Header = () => {
  const {
    register, handleSubmit, watch, setValue, formState: { errors }, getValues,
  } = useForm<UseFormProps>({
    defaultValues: {
      category: { value: "" },
      typeGood: typeGoodList[1],
      search: "",
    },
  })

  const onSubmit = (data: UseFormProps) => {
    console.log(data)
  }

  const search = watch("search")
  const filterByCategory = watch("category")
  const filterByTypeGood = watch("typeGood")

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
          {[1, 2, 3].map((icon) => (
            <IconButton key={icon} sx={{ p: 0.5 }}>
              <Icon name="" sx={{ fontSize: 20 }} />
            </IconButton>
          ))}
        </Box>
      </Box>
      <Box ai flex row gap>
        {filterList.map((filter) => (
          <Select
            key={filter.name}
            clear
            value={getValues(filter.name) as Option}
            // @ts-ignore
            setValue={setValue}
            options={filter.options}
            inputProps={{ size: "small", label: filter.caption }}
            {...register(filter.name)}
          />
        ))}
      </Box>
    </>
  )
}

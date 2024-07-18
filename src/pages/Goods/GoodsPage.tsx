import { Box } from "shared/ui/Box"
import {
  IconButton,
} from "@mui/material"
import { Icon } from "shared/ui/Icon"
import React, {
  useEffect,
} from "react"
import { Input } from "shared/ui/Input"
import { Select } from "shared/ui/Select"
import { useForm } from "react-hook-form"

interface Option {
  id?: number
  value: string
  icon?: string
  default?: boolean
}

export interface UseFormProps {
  filterByCategory: Option
  filterByTypeGood: Option
  search: string
}

const GoodsPage = () => {
  const {
    register, handleSubmit, watch, setValue, formState: { errors }, getValues,
  } = useForm<UseFormProps>({
    defaultValues: {
      filterByCategory: { value: "" },
      filterByTypeGood: { value: "" },
      search: "",
    },
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  const search = watch("search")
  const filterByCategory = watch("filterByCategory")
  const filterByTypeGood = watch("filterByTypeGood")

  useEffect(() => {
    handleSubmit(onSubmit)()
  }, [search, filterByCategory, filterByTypeGood])

  return (
    <Box flex gap>
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
        <Select
          clear
          value={getValues("filterByCategory")}
          setValue={setValue}
          inputProps={{ size: "small", label: "Категория" }}
          options={[{ id: 1, value: "option1" }, { id: 2, value: "option2" }]}
          {...register("filterByCategory")}
        />

        <Select
          clear
          value={getValues("filterByTypeGood")}
          setValue={setValue}
          {...register("filterByTypeGood")}
          inputProps={{ size: "small", label: "Тип товара" }}
          options={
            [
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
          }
        />
      </Box>
    </Box>
  )
}

export default GoodsPage

/**
 * react-dom.development.js:86 Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
 *
 * Check the render method of `GoodsPage`.
 */

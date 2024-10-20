import {
  Controller, FormProvider, useForm,
} from "react-hook-form"
import {
  memo, ReactNode, useEffect, useState,
} from "react"
import { Box } from "shared/ui/box"
import { Input } from "shared/ui/form/input"
import { z } from "zod"
import { SelectItem } from "shared/ui/form/select"
import { BackButton } from "shared/ui/buttons/back-button"
import { RefetchButton } from "shared/ui/buttons/refresh-button"
import { useQuery } from "@tanstack/react-query"
import { $axios } from "shared/config/axios"
import Autocomplete from "@mui/material/Autocomplete"
import { validation } from "shared/lib/validation"
import { Icon } from "shared/ui/icon"
import { useSearchParams } from "react-router-dom"
import { useEvent } from "shared/hooks/use-event"

export interface TypeGood {
  id: number
  caption: string
  icon: string
}

const typeGoodList = [
  {
    id: 1,
    caption: "zxc",
    icon: "consumable",
  },
  {
    id: 2,
    caption: "qwe",
    icon: "typeGood",
  },
]

interface FiltersProps {
  createButton: ReactNode
}

export const categorySchema = z.object({
  id: z.number(),
  description: z.string().optional(),
  caption: z.string(),
  order: z.number(),
})

export const categoriesSchema = z.array(categorySchema)

export type Categories = z.infer<typeof categoriesSchema>
export type Category = z.infer<typeof categorySchema>

export interface UseFormProps {
  search: string
  category: Category | null
  typeGood: TypeGood | null
}

export const useGetAllCategories = () => {
  const { data, isLoading } = useQuery<Categories>({
    queryKey: ["categories"],
    queryFn: () => $axios.get("/categories/all").then(({ data }) => data),
  })

  let validatedData = data
  if (data !== undefined) {
    validatedData = validation(categoriesSchema, data)
  }

  return { categories: validatedData, isLoading }
}

export const Filters = memo((props: FiltersProps) => {
  const { createButton } = props

  const [searchParams, setSearchParams] = useSearchParams()
  const [isFocused, setIsFocused] = useState(false)
  const { categories, isLoading } = useGetAllCategories()

  const methods = useForm<UseFormProps>({
    defaultValues: {
      search: "",
      category: null,
      typeGood: typeGoodList[1],
    },
  })

  useEvent("keydown", (event: any) => {
    const search = methods.getValues("search")
    if (isFocused && typeof search === "string" && event.key === "Enter") {
      setSearchParams((prev) => {
        if (search) prev.set("search", search)
        else prev.delete("search")

        return prev
      })
    }
  })

  useEffect(() => {
    const search = searchParams.get("search") ?? ""
    const category = searchParams.get("category")
    const typeGood = searchParams.get("typeGood")

    const findCategory = categories?.find((item) => item.caption === category) ?? null
    const findTypeGood = typeGoodList?.find((item) => item.caption === typeGood)

    methods.setValue("search", search)
    methods.setValue("category", findCategory)

    if (findTypeGood) methods.setValue("typeGood", findTypeGood)
  }, [searchParams, categories])

  const applySearchParam = (name: string, value?: string) => {
    setSearchParams((prev) => {
      if (value) prev.set(name, value)
      else prev.delete(name)

      return prev
    })
  }

  return (
    <FormProvider {...methods}>
      <Box flex row ai gap>
        <Controller
          name="search"
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              fullWidth
              onClear={() => applySearchParam("search")}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              setValue={methods.setValue}
              size="small"
              label="Поиск"
            />
          )}
        />
        <Box flex row>
          <RefetchButton onRefetch={() => {}} />
          {createButton}
          <BackButton />
        </Box>
      </Box>
      <Box ai flex row gap grow sx={{ width: 1 }}>
        {!isLoading && categories && (
          <Controller
            name="category"
            control={methods.control}
            render={({ field }) => (
              <Autocomplete
                fullWidth
                options={categories}
                value={field.value ?? null}
                isOptionEqualToValue={(option, value) => option?.caption === value?.caption}
                getOptionLabel={(option) => option.caption}
                onChange={(_, value) => {
                  field.onChange(value)
                  applySearchParam("category", value?.caption)
                }}
                renderInput={(params) => (
                  <Input
                    {...params}
                    size="small"
                    label="Категория"
                  />
                )}
                renderOption={({ key, ...other }, option) => (
                  <SelectItem key={key} {...other}>
                    <Box />
                    {option.caption}
                  </SelectItem>
                )}
              />
            )}
          />
        )}

        <Controller
          name="typeGood"
          control={methods.control}
          render={({ field }) => (
            <Autocomplete
              fullWidth
              options={typeGoodList}
              value={field.value ?? null}
              isOptionEqualToValue={(option, value) => option?.caption === value?.caption}
              getOptionLabel={(option) => option.caption}
              onChange={(_, value) => {
                field.onChange(value)
                applySearchParam("typeGood", value?.caption)
              }}
              renderInput={(params) => {
                const findOption = methods.getValues("typeGood")

                return (
                  <Input
                    {...params}
                    size="small"
                    label="Тип товара"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        findOption ? (
                          <Icon
                            fontSize="small"
                            name={findOption?.icon}
                          />
                        ) : null),
                    }}
                  />
                )
              }}
              renderOption={({ key, ...other }, option) => (
                <SelectItem key={key} {...other}>
                  <Icon name={option.icon} />
                  {option.caption}
                </SelectItem>
              )}
            />
          )}
        />
      </Box>
    </FormProvider>
  )
})

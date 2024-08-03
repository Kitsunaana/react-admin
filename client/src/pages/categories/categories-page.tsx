import { Box } from "shared/ui/box"
import { Table } from "shared/ui/table"
import {
  Controller, FormProvider, useForm, useFormContext,
} from "react-hook-form"
import { Input } from "shared/ui/input"
import { BackButton } from "shared/ui/back-button"
import React, { ReactNode, useEffect } from "react"
import { IconButton } from "shared/ui/icon-button"
import {
  Button,
  Pagination,
} from "@mui/material"
import { Backdrop } from "shared/ui/backdrop"
import { z } from "zod"
import { CreateButton } from "shared/ui/create-button"
import { CategoryRow } from "widgets/category-row/ui/category-row"
import { categoriesSchema, categorySchema } from "features/categories/create-and-edit/model/schemas"
import { useCategories } from "entities/category/queries/use-categories"
import { Dialog } from "features/categories/create-and-edit/ui/dialog"
import { useEvent } from "shared/hooks/use-event"
import { useSearchParams } from "react-router-dom"

export const SearchInput = () => {
  const { control } = useFormContext()

  const [_, setSearchParams] = useSearchParams()

  return (
    <Controller
      name="search"
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          sx={{ width: 1 }}
          label="Поиск"
          size="small"
          onClear={() => {
            setSearchParams("")
          }}
          InputProps={{
            fullWidth: true,
          }}
        />
      )}
    />
  )
}

interface CategoryHeaderProps {
  createButton: ReactNode
}

const CategoryHeader = (props: CategoryHeaderProps) => {
  const { createButton } = props

  const [searchParams, setSearchParams] = useSearchParams()

  const { getValues, setValue } = useFormContext()

  useEffect(() => {
    setValue("search", searchParams.get("search") ?? "")
  }, [searchParams])

  useEvent("keydown", (event: KeyboardEvent) => {
    const search = getValues("search")
    if (!(event.code === "Enter" && search !== null)) return

    setSearchParams(`?search=${search}`)
  })

  return (
    <Box flex ai row gap>
      <SearchInput />
      <Box flex ai row>
        <IconButton
          name="reload"
          color="primary"
          fontSize={20}
        />
        {createButton}
        <BackButton />
      </Box>
    </Box>
  )
}

const CategoriesPage = () => {
  const [searchParams] = useSearchParams()
  const methods = useForm({
    defaultValues: {
      search: searchParams.get("search") ?? "",
    },
  })

  const { data: categoriesData, isSuccess } = useCategories({
    search: searchParams.get("search"),
  })

  const renderContent = () => {
    const { data, success } = categoriesSchema.safeParse(categoriesData)

    if (!(isSuccess && success)) return <div />

    return data.map((category: z.infer<typeof categorySchema>) => (
      <CategoryRow
        key={category.id}
        caption={category.caption}
        id={category.id}
        // images={category.images}
        images={[]}
      />
    ))
  }

  return (
    <>
      <Table
        header={(
          <FormProvider {...methods}>
            <CategoryHeader
              createButton={<CreateButton langBase="catalog" />}
            />
          </FormProvider>
        )}
        bottom={(
          <Box sx={{ mr: 0, ml: "auto" }}>
            <Pagination
              count={3}
              variant="outlined"
              shape="rounded"
              onChange={(event, page) => {
                console.log(page)
              }}
            />
          </Box>
        )}
        content={renderContent()}
      />
      <Dialog />
      <Backdrop />
    </>
  )
}

export default CategoriesPage

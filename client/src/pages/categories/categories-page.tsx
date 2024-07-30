import { Box } from "shared/ui/box"
import { Table } from "shared/ui/table"
import {
  Controller, FormProvider, useForm, useFormContext,
} from "react-hook-form"
import { Input } from "shared/ui/input"
import { BackButton } from "shared/ui/back-button"
import React, { ReactNode, useState } from "react"
import { IconButton } from "shared/ui/icon-button"
import {
  alpha, Badge, MenuItem, Pagination,
} from "@mui/material"
import { Text } from "shared/ui/text"
import { Vertical } from "shared/ui/divider"
import { ActionButton } from "shared/ui/action-button"
import { Backdrop } from "shared/ui/backdrop"
import { TooltipImageView } from "shared/ui/tooltip-image-view"
import { MIKU } from "shared/config/constants"
import { Position } from "shared/ui/position-counter"
import { DialogCreate } from "features/categories/create"
import { dispatch } from "shared/lib/event"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { z } from "zod"
import { useCategories } from "features/categories/create/model/use-categories"
import { categoriesSchema, categorySchema } from "features/categories/create/model/schemas"
import { CategoryItem } from "entities/category/ui/category-row"
import { CreateButton } from "shared/ui/create-button"

export const SearchInput = () => {
  const { control } = useFormContext()

  return (
    <Controller
      name="search.value"
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          sx={{ width: 1 }}
          label="Поиск"
          size="small"
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

  const methods = useForm({
    defaultValues: {
      search: { value: "" },
    },
  })

  return (
    <FormProvider {...methods}>
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
    </FormProvider>
  )
}

const CategoriesPage = () => {
  const { data: categoriesData, isSuccess, isLoading } = useCategories()

  const renderContent = () => {
    const { data, success } = categoriesSchema.safeParse(categoriesData)

    if (!(isSuccess && success)) return <div />

    return data.map((category: z.infer<typeof categorySchema>) => (
      <CategoryItem
        key={category.id}
        caption={category.caption}
        id={category.id}
      />
    ))
  }

  return (
    <>
      <Table
        header={<CategoryHeader createButton={<CreateButton actionName="dialog.catalog.create" />} />}
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
      <DialogCreate />
      <Backdrop />
    </>
  )
}

export default CategoriesPage

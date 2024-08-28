import { Box } from "shared/ui/box"
import { Table } from "shared/ui/table"
import {
  Controller, FormProvider, useForm, useFormContext,
} from "react-hook-form"
import { Input } from "shared/ui/form/input"
import { BackButton } from "shared/ui/back-button"
import React, { ReactNode, useEffect } from "react"
import { IconButtonBase } from "shared/ui/buttons/icon-button-base"
import {
  Pagination,
} from "@mui/material"
import { Backdrop } from "shared/ui/backdrop"
import { z } from "zod"
import { CreateButton } from "shared/ui/buttons/create-button"
import { CategoryRow } from "widgets/category-row/ui/category-row"
import { categoriesSchema, categorySchema } from "features/categories/create-and-edit/model/schemas"
import { useCategories } from "entities/category/queries/use-categories"
import { useEvent } from "shared/hooks/use-event"
import { useSearchParams } from "react-router-dom"
import { Text } from "shared/ui/text"
import { Mark } from "shared/ui/mark"
import { DialogDelete } from "features/categories/delete/ui/dialog"
import { Icon } from "shared/ui/icon"
import { validation } from "shared/lib/validation"
import { Gallery } from "widgets/galerry"
import { RootDialogProvider } from "shared/ui/dialog/context/dialog-context"
import { CategoryEditDialog } from "features/categories"

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
  refetch: () => void
}

const CategoryHeader = (props: CategoryHeaderProps) => {
  const { createButton, refetch } = props

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
        <IconButtonBase
          onClick={refetch}
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
  const [searchParams, setSearchParams] = useSearchParams()
  const methods = useForm({
    defaultValues: {
      search: searchParams.get("search") ?? "",
    },
  })

  const { categoriesData, categoriesIsLoading, refetchCategories } = useCategories({
    search: searchParams.get("search"),
    page: searchParams.get("page") ?? 1,
  })

  const renderContent = () => {
    if (categoriesIsLoading) return

    const data = validation(categoriesSchema, categoriesData)

    if (data?.length === 0) {
      return (
        <Box ai flex jc sx={{ height: 1 }}>
          <Icon color="warning" name="empty" sx={{ fontSize: 80 }} />
          <Text langBase="global" name="listEmpty" />
        </Box>
      )
    }

    return data.map((category: z.infer<typeof categorySchema>) => (
      <CategoryRow
        key={category.id}
        caption={category.caption}
        id={category.id}
        order={category.order}
        images={category.media ?? []}
      />
    ))
  }

  return (
    <RootDialogProvider>
      <Table
        header={(
          <FormProvider {...methods}>
            <CategoryHeader
              refetch={refetchCategories}
              createButton={<CreateButton />}
            />
          </FormProvider>
        )}
        bottom={(
          <Box flex ai row gap sx={{ mr: 0, ml: "auto" }}>
            <Text
              name="rows.count"
              value={categoriesData?.count ?? 0}
              translateOptions={{
                components: {
                  strong: <Mark />,
                },
              }}
            />
            <Pagination
              count={Math.ceil((categoriesData?.count ?? 0) / 25)}
              variant="outlined"
              shape="rounded"
              onChange={(event, page) => {
                setSearchParams((prev) => {
                  prev.set("page", String(page))
                  return prev
                })
              }}
            />
          </Box>
        )}
        content={renderContent()}
      />

      <CategoryEditDialog />
      <DialogDelete />

      <Gallery />
      <Backdrop />
    </RootDialogProvider>
  )
}

export default CategoriesPage

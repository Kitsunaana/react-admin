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
import { categoriesSchema, categorySchema } from "features/categories/edit/model/schemas"
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
import { IParams } from "entities/category/api/types"
import { useQuery } from "@tanstack/react-query/build/modern"
import { categoriesApi } from "entities/category/api/categories-api"
import { MobxQuery } from "shared/lib/mobx-react-query"
import { queryClient } from "app/providers/query-client"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"
import * as querystring from "querystring"
/*
export const useCategories = (options: IParams) => {
  const { search, page } = options

  const {
    data, isLoading, isFetching, error, refetch,
  } = useQuery({
    queryKey: ["categories", search, page],
    queryFn: () => categoriesApi.getAll(options),
  })

  return {
    categoriesData: data,
    categoriesError: error,
    categoriesIsLoading: isLoading || isFetching,
    refetchCategories: refetch,
  }
} */

import queryString from "query-string"
import { $axios } from "shared/config/axios"
import { stringifiedParams } from "shared/lib/utils"

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

    categoriesSearchStore.setSearchParams(getValues())
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

class SearchStore {
  searchParams = queryString.stringify(queryString.parseUrl(window.location.search).query)
  page = 1

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setPage(page: number) {
    console.log(page)
  }

  setSearchParams(data) {
    this.searchParams = queryString.stringify(data)
  }
}

const createSearchStore = () => new SearchStore()
export const categoriesSearchStore = createSearchStore()

class CategoriesStore {
  categoriesQuery = new MobxQuery(
    () => ({
      queryKey: ["categories", categoriesSearchStore.searchParams],
      queryFn: () => $axios.get(`/categories?${categoriesSearchStore.searchParams}`)
        .then(({ data }) => data),
    }),
    queryClient,
  )

  constructor() {
    makeAutoObservable(this)
  }
}

const categoriesStore = new CategoriesStore()

const CategoriesPage = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams()
  const methods = useForm({
    defaultValues: {
      search: searchParams.get("search") ?? "",
    },
  })

  const {
    data: categoriesData,
    isLoading: categoriesIsLoading,
    refetch: refetchCategories,
  } = categoriesStore.categoriesQuery.result

  const renderContent = () => {
    if (categoriesIsLoading) return

    const data = validation(categoriesSchema, categoriesData)

    if (data?.rows.length === 0) {
      return (
        <Box ai flex jc sx={{ height: 1 }}>
          <Icon color="warning" name="empty" sx={{ fontSize: 80 }} />
          <Text langBase="global" name="listEmpty" />
        </Box>
      )
    }

    return data.rows.map((category: z.infer<typeof categorySchema>) => (
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
})

export default CategoriesPage

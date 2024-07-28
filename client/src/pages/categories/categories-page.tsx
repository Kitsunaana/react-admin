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

export const CreateButton = () => (
  <IconButton
    name="add"
    color="success"
    fontSize={20}
    onClick={() => {
      dispatch("dialog.catalog.create" as any)
    }}
  />
)

export const CategoryItem = () => (
  <Box
    flex
    ai
    row
    jc_sp
    sx={{
      px: 1,
      height: 48,
      border: ({ palette }) => `1px solid ${alpha(palette.grey["600"], 0.75)}`,
      "&:last-child": {
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
      },
      "&:first-of-type": {
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
      },
    }}
  >
    <Text caption="Экзотические фрукты" />
    <Box row flex ai>
      <TooltipImageView images={MIKU} />
      <Vertical />
      <Badge
        badgeContent={9}
        color="warning"
        sx={{
          "& .MuiBadge-badge": {
            px: 0.25,
            top: 3,
            right: 3,
          },
        }}
      >
        <IconButton name="goods" fontSize={20} />
      </Badge>
      <Vertical />
      <Position count={17345} />
      <Vertical />
      <IconButton name="stopList" fontSize={20} />
      <Vertical />
      <ActionButton renderActions={(onClose) => (
        <MenuItem onClick={onClose}>123</MenuItem>
      )}
      />
    </Box>
  </Box>
)

const CategoriesPage = () => (
  <>
    <Table
      header={<CategoryHeader createButton={<CreateButton />} />}
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
      content={new Array(20).fill(1).map((_, index) => index).map((id) => (
        <CategoryItem
          key={id}
        />
      ))}
    />
    <DialogCreate />
    <Backdrop />
  </>
)

export default CategoriesPage

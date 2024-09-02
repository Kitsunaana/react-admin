import { Box } from "shared/ui/box"
import { Table } from "shared/ui/table"
import React from "react"
import { CreateButton } from "shared/ui/buttons/create-button"
import { Text } from "shared/ui/text"
import { Mark } from "shared/ui/mark"
import { CategoryDeleteDialog } from "features/categories/delete/ui/category-delete-dialog"
import { RootDialogProvider } from "shared/ui/dialog/context/dialog-context"
import { CategoryEditDialog } from "features/categories"
import { observer } from "mobx-react-lite"
import { CategoryHeader } from "pages/categories/ui/header"
import { EmptyList } from "shared/ui/empty-list"
import { categoriesStore, CategoryRow } from "entities/category"
import { Spinner } from "shared/ui/spinner"
import { RefetchButton } from "shared/ui/buttons/refresh-button"
import { Pagination } from "shared/ui/pagination"

const CategoriesPage = observer(() => {
  const { data, isLoading, refetch } = categoriesStore.categoriesQuery.result

  const renderContent = () => {
    const isShowEmptyList = (!data || data?.rows.length === 0) && !isLoading

    if (isLoading) return <Spinner />
    if (isShowEmptyList) return <EmptyList />
    if (!data) return null

    return data.rows.map((category) => (
      <CategoryRow
        key={category.id}
        images={category?.media}
        {...category}
      />
    ))
  }

  return (
    <RootDialogProvider>
      <Table
        content={renderContent()}
        header={(
          <CategoryHeader
            refetchButton={<RefetchButton onRefetch={refetch} />}
            createButton={<CreateButton />}
          />
        )}
        bottom={(
          <Box flex ai row gap sx={{ mr: 0, ml: "auto" }}>
            <Text
              name="rows.count"
              value={`${data?.count ?? 0}`}
              translateOptions={{
                components: {
                  strong: <Mark />,
                },
              }}
            />
            <Pagination count={data?.count} />
          </Box>
        )}
      />

      <CategoryEditDialog />
      <CategoryDeleteDialog />

    </RootDialogProvider>
  )
})

export default CategoriesPage

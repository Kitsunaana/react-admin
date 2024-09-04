import React, {
} from "react"
import { CardProduct } from "entities/goods"
import { Backdrop } from "shared/ui/backdrop"
import { Filters } from "features/goods/filters/ui/filters"
import { Table } from "shared/ui/table"
import { BottomPage } from "shared/ui/bottom-page"
import { CreateButton } from "shared/ui/buttons/create-button"
import { GoodDialog } from "features/goods/dialog"
import { EmptyList } from "shared/ui/empty-list"
import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { $axios } from "shared/config/axios"
import { Spinner } from "shared/ui/spinner"
import { z } from "zod"
import { validation } from "shared/lib/validation"

export const goodSchema = z.object({
  id: z.number(),
  caption: z.string(),
  description: z.string().nullable(),
  category: z.object({
    caption: z.string(),
    description: z.string().nullable(),
    id: z.number(),
    order: z.number(),
  }),
})

export const goodsSchema = z.array(goodSchema)

export type Good = z.infer<typeof goodSchema>
export type Goods = z.infer<typeof goodsSchema>

export const useGetAllGoods = () => {
  const [searchParams] = useSearchParams()

  const search = searchParams.get("search")
  const typeGood = searchParams.get("typeGood")
  const category = searchParams.get("category")

  const { data, isLoading } = useQuery<Goods>({
    queryKey: ["goods", search, category, typeGood],
    queryFn: () => $axios.get("/goods").then(({ data }) => data),
  })

  let validatedData = data
  if (data) validatedData = validation(goodsSchema, data)

  return { goods: validatedData, isLoadingGoods: isLoading }
}

const GoodsPage = () => {
  const { goods, isLoadingGoods } = useGetAllGoods()

  const renderContent = () => {
    if (!goods && !isLoadingGoods) return <EmptyList />
    if (isLoadingGoods) return <Spinner />
    if (!goods) return null

    return goods.map((good) => (
      <CardProduct
        key={good.id}
        caption={good.caption}
        category={good.category.caption}
      />
    ))
  }

  return (
    <>
      <Table
        header={<Filters createButton={<CreateButton />} />}
        content={renderContent()}
        bottom={<BottomPage />}
      />
      <GoodDialog />
    </>
  )
}

export default GoodsPage

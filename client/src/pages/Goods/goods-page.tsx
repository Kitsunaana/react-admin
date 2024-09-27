import { CardProduct } from "entities/goods"
import { Filters } from "features/goods/filters/ui/filters"
import { Table } from "shared/ui/table"
import { BottomPage } from "shared/ui/bottom-page"
import { CreateButton } from "shared/ui/buttons/create-button"
import { GoodDialog } from "features/goods/dialog"
import { EmptyList } from "shared/ui/empty-list"
import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Spinner } from "shared/ui/spinner"
import { goodsApi } from "shared/api/goods-api"

export const useGetAllGoods = () => {
  const [searchParams] = useSearchParams()

  const search = searchParams.get("search")
  const typeGood = searchParams.get("typeGood")
  const category = searchParams.get("category")

  const { data, isLoading } = useQuery({
    queryKey: ["goods", search, category, typeGood],
    queryFn: goodsApi.getAll,
  })

  return { goods: data, isLoadingGoods: isLoading }
}

const GoodsPage = () => {
  const { goods, isLoadingGoods } = useGetAllGoods()

  const renderContent = () => {
    if (isLoadingGoods) return <Spinner />
    if (!goods) return <EmptyList />

    return goods.map((good) => (
      <CardProduct
        key={good.id}
        caption={good.caption}
        category={good.category.caption}
        id={good.id}
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

import React, {
} from "react"
import { CardProduct } from "entities/goods"
import { Backdrop } from "shared/ui/backdrop"
import { Filters } from "features/goods/filters/ui/filters"
import { Table } from "shared/ui/table"
import { BottomPage } from "shared/ui/bottom-page"
import { CreateButton } from "shared/ui/create-button"

const GoodsPage = () => (
  <>
    <Table
      header={<Filters createButton={<CreateButton langBase="goods" />} />}
      content={new Array(40).fill(20).map((_, index) => index).map((item) => (
        <CardProduct key={item} />
      ))}
      bottom={<BottomPage />}
    />
    <Backdrop />
  </>
)

export default GoodsPage

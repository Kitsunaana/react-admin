import React, {
} from "react"
import { CardProduct } from "entities/goods"
import { Backdrop } from "shared/ui/backdrop"
import { Filters } from "features/goods/filters/ui/filters"
import { Table } from "shared/ui/table"
import { DialogCreate } from "features/goods/create/ui/dialog-create"
import { DialogEdit } from "features/goods/edit/ui/dialog-edit"
import { BottomPage } from "shared/ui/bottom-page"
import { CreateButton } from "features/goods/create/ui/create-button"

const GoodsPage = () => (
  <>
    <Table
      header={<Filters createButton={<CreateButton />} />}
      content={new Array(40).fill(20).map((_, index) => index).map((item) => (
        <CardProduct key={item} />
      ))}
      bottom={<BottomPage />}
    />
    <Backdrop />
    <DialogCreate />
    <DialogEdit />
  </>
)

export default GoodsPage

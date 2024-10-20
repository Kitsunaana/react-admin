import { Filters } from "features/goods/filters/ui/filters"
import { CreateButton } from "shared/ui/buttons/create-button"
import { Table } from "shared/ui/table"

const GoodsPage = () => (
  <Table
    header={<Filters createButton={<CreateButton />} />}
    content={<div />}
    bottom={<div />}
  />
)

export default GoodsPage

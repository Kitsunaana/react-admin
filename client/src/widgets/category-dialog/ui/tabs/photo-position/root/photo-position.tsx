import { observer } from "mobx-react-lite"
import { CategoryFields } from "shared/types/new_types/types"
import { Form } from "../form"
import { Slider } from "../gallery"
import { Layout } from "../layout"

export const Root = observer(({ defaultValue }: { defaultValue: CategoryFields }) => (
  <Layout
    form={<Form defaultValue={defaultValue} />}
    slider={<Slider />}
  />
))

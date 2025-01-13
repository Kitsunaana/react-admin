import { observer } from "mobx-react-lite"
import { Form } from "../form"
import { Slider } from "../gallery"
import { Layout } from "../layout"

export const Root = observer(() => (
  <Layout
    form={<Form />}
    slider={<Slider />}
  />
))

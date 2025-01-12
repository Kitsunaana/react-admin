import { Form } from "../form"
import { Actions } from "../actions"
import { Layout } from "../layout"

export const Root = ({ onRefetch }: { onRefetch: () => void }) => (
  <Layout
    form={<Form />}
    actions={<Actions onRefetch={onRefetch} />}
  />
)

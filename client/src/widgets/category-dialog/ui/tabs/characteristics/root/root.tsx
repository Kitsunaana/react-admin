import { observer } from "mobx-react-lite"
import { Layout } from "../layout"
import { List } from "../list"
import { Actions } from "../actions"

export const Root = observer(() => (
  <Layout
    list={<List />}
    actions={<Actions />}
  />
))

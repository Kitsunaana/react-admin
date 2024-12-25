import { observer } from "mobx-react-lite"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Text } from "shared/ui/text"
import { openCreateCharacteristicModal } from "widgets/category-dialog/model/characteristic/characteristic"
import { Layout } from "../layout"
import { List } from "../list"

export const Root = observer(() => (
  <Layout
    list={<List />}
    actions={(
      <IconButton
        name="add"
        onClick={openCreateCharacteristicModal}
        help={{
          title: (
            <Text
              onlyText
              name="actions.add"
            />
          ),
        }}
      />
      )}
  />
))

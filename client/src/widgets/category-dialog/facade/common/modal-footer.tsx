import { IconButton } from "shared/ui/buttons/icon-button"
import { Text } from "shared/ui/text"
import { Mark } from "shared/ui/mark"
import { observer } from "mobx-react-lite"
import { ModalHistory } from "../../ui/history"
import { Footer } from "../../ui/footer"
import { useCategoryHistory } from "../use-category-history"

export const ModalFooter = observer(() => {
  const categoryHistory = useCategoryHistory()

  return (
    <Footer>
      <ModalHistory />
      <IconButton
        name="undo"
        disabled={!categoryHistory.canUndo}
        onClick={categoryHistory.onUndo}
        help={{
          title: (
            <Text
              name="undo"
              value="Ctrl+Z"
              translateOptions={{
                components: {
                  strong: <Mark />,
                },
              }}
            />
          ),
        }}
      />
      <IconButton
        name="redo"
        disabled={!categoryHistory.canRedo}
        onClick={categoryHistory.onRedo}
        help={{
          title: (
            <Text
              name="redo"
              value="Ctrl+Shift+Z"
              translateOptions={{
                components: {
                  strong: <Mark />,
                },
              }}
            />
          ),
        }}
      />
    </Footer>
  )
})

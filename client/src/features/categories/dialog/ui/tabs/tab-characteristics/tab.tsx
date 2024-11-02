import {
  openCreateCharacteristicDialog,
} from "entities/characteristic"
import { eventBus } from "shared/lib/event-bus"
import { IconButton } from "shared/ui/buttons/icon-button"
import { EmptyList } from "shared/ui/empty-list"
import { Text } from "shared/ui/text"
import { useCategoryStores } from "../../context"
import { TabCharacteristicsLayout } from "./layout"
import { CharacteristicsList } from "./list"

interface TabCharacteristicsProps {
  tab: number
}

export const TabCharacteristics = (props: TabCharacteristicsProps) => {
  const { tab } = props

  const { characteristicsStore } = useCategoryStores()

  const isEmptyList = characteristicsStore.filteredItems.length === 0

  return (
    <TabCharacteristicsLayout
      emptyList={isEmptyList && <EmptyList />}
      list={(<CharacteristicsList tab={tab} />)}
      actions={(
        <>
          <IconButton
            name="add"
            onClick={() => eventBus.emit(openCreateCharacteristicDialog({}))}
            help={{
              title: (
                <Text
                  onlyText
                  name="actions.add"
                />
              ),
            }}
          />
          <IconButton
            name="help"
            help={{
              title: (
                <Text
                  onlyText
                  name="actions.help"
                />
              ),
            }}
          />
          <IconButton
            name="keyboard"
            help={{
              title: (
                <Text
                  onlyText
                  name="actions.keyboard"
                />
              ),
            }}
          />
        </>
      )}
    />
  )
}
